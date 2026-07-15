import logging
import time
import os
import uuid
from flask import current_app
from werkzeug.utils import secure_filename
from inference.predictor import get_predictor
from extensions import db
from models.prediction import Prediction
from repositories.mongo_repository import mongo_repo

logger = logging.getLogger(__name__)

def run_prediction(image_file, user_id: str) -> dict:
    predictor = get_predictor()

    # 1. Save image to uploads folder
    filename = secure_filename(image_file.filename)
    unique_filename = f"{uuid.uuid4()}_{filename}"
    upload_path = os.path.join(current_app.config['UPLOAD_FOLDER'], unique_filename)
    image_file.seek(0)
    image_file.save(upload_path)
    
    # 2. Run prediction
    image_file.seek(0)
    start = time.perf_counter()
    result = predictor.predict(image_file.stream)
    elapsed_ms = (time.perf_counter() - start) * 1000
    
    # 3. Save to MongoDB
    mongo_metadata = {
        "original_filename": filename,
        "image_path": upload_path,
        "probabilities": result["probabilities"],
        "is_tumor": result["is_tumor"],
        "processing_time_ms": elapsed_ms,
        "model_version": current_app.config.get("MODEL_PATH", "unknown")
    }
    mongo_doc_id = mongo_repo.save_prediction_metadata(mongo_metadata)
    
    # 4. Save to PostgreSQL
    new_prediction = Prediction(
        user_id=user_id,
        mongo_doc_id=mongo_doc_id,
        prediction=result["prediction"],
        confidence=result["confidence"],
        processing_time=elapsed_ms,
        model_version=current_app.config.get("MODEL_PATH", "unknown")
    )
    db.session.add(new_prediction)
    db.session.commit()

    logger.info(
        "Prediction complete: class=%s confidence=%.2f%% time=%.1fms",
        result["prediction"], result["confidence"], elapsed_ms,
    )

    return {
        "id": new_prediction.id,
        "prediction": result["prediction"],
        "confidence": result["confidence"],
        "probabilities": result["probabilities"],
        "isTumor": result["is_tumor"],
        "processingTime": f"{elapsed_ms:.0f}ms",
    }

def get_prediction_history(user_id: str):
    predictions = Prediction.query.filter_by(user_id=user_id).order_by(Prediction.created_at.desc()).all()
    return [{
        "id": p.id,
        "prediction": p.prediction,
        "confidence": p.confidence,
        "created_at": p.created_at.isoformat()
    } for p in predictions]

def get_prediction_details(prediction_id: str, user_id: str):
    prediction = Prediction.query.filter_by(id=prediction_id, user_id=user_id).first()
    if not prediction:
        return None
    
    details = {
        "id": prediction.id,
        "prediction": prediction.prediction,
        "confidence": prediction.confidence,
        "processing_time": prediction.processing_time,
        "model_version": prediction.model_version,
        "created_at": prediction.created_at.isoformat()
    }
    
    if prediction.mongo_doc_id:
        mongo_data = mongo_repo.get_prediction_metadata(prediction.mongo_doc_id)
        if mongo_data:
            details["probabilities"] = mongo_data.get("probabilities")
            details["original_filename"] = mongo_data.get("original_filename")
            details["image_path"] = mongo_data.get("image_path")
            
    return details

def delete_prediction(prediction_id: str, user_id: str):
    prediction = Prediction.query.filter_by(id=prediction_id, user_id=user_id).first()
    if not prediction:
        return False
        
    if prediction.mongo_doc_id:
        mongo_repo.delete_prediction_metadata(prediction.mongo_doc_id)
        
    db.session.delete(prediction)
    db.session.commit()
    return True
