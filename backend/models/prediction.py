import uuid
from datetime import datetime
from extensions import db

class Prediction(db.Model):
    __tablename__ = 'predictions'

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False, index=True)
    mongo_doc_id = db.Column(db.String(24), nullable=True) # References MongoDB document
    prediction = db.Column(db.String(50), nullable=False)
    confidence = db.Column(db.Float, nullable=False)
    processing_time = db.Column(db.Float, nullable=True)
    model_version = db.Column(db.String(50), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, index=True)

    def __init__(self, **kwargs):
        super(Prediction, self).__init__(**kwargs)

    def __repr__(self):
        return f"<Prediction {self.id} - {self.prediction}>"
