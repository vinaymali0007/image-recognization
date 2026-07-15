import uuid
from datetime import datetime
from extensions import db

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    organization = db.Column(db.String(150), nullable=True)
    role = db.Column(db.String(20), nullable=False, default='USER') # ADMIN, DOCTOR, RESEARCHER, USER
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_login = db.Column(db.DateTime, nullable=True)

    predictions = db.relationship('Prediction', backref='user', lazy=True, cascade="all, delete-orphan")

    def __init__(self, **kwargs):
        super(User, self).__init__(**kwargs)


    def __repr__(self):
        return f"<User {self.email} ({self.role})>"
