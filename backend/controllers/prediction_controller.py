import logging
from flask import request, g
from services.prediction_service import (
    run_prediction, 
    get_prediction_history, 
    get_prediction_details, 
    delete_prediction
)
from utils.response import success_response, error_response
from utils.validation import validate_prediction_request, ValidationError

logger = logging.getLogger(__name__)

def handle_predict():
    try:
        validate_prediction_request(request.files)
    except ValidationError as exc:
        return error_response(exc.message, exc.status_code)

    image_file = request.files["image"]
    user_id = g.user_id

    try:
        result = run_prediction(image_file, user_id)
    except Exception as exc:
        logger.exception("Unexpected error during prediction")
        return error_response("Internal error during prediction", 500)

    return success_response(result, 201)

def handle_history():
    history = get_prediction_history(g.user_id)
    return success_response({"history": history}, 200)

def handle_details(id):
    details = get_prediction_details(id, g.user_id)
    if not details:
        return error_response("Prediction not found", 404)
    return success_response(details, 200)

def handle_delete(id):
    success = delete_prediction(id, g.user_id)
    if not success:
        return error_response("Prediction not found", 404)
    return success_response({"message": "Deleted successfully"}, 200)
