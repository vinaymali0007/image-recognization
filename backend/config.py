"""
Application configuration.

Loads environment variables and exposes a single Config class used
by the Flask app factory. Keeping configuration in one place makes
it easy to override values per-environment (dev, test, prod).
"""

import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    """Central configuration object for the Flask application."""

    # Server
    PORT = int(os.getenv("PORT", 5000))
    DEBUG = os.getenv("DEBUG", "False").lower() == "true"

    # Model
    MODEL_PATH = os.getenv("MODEL_PATH", "weights/cnn.pth")

    # Uploads
    UPLOAD_FOLDER = os.getenv("UPLOAD_FOLDER", "uploads")
    MAX_UPLOAD_SIZE = int(os.getenv("MAX_UPLOAD_SIZE", 10 * 1024 * 1024))  # 10 MB
    ALLOWED_EXTENSIONS = {"jpg", "jpeg", "png"}

    # CORS
    CORS_ORIGINS = os.getenv("CORS_ORIGINS", "*")

    # Security
    JWT_SECRET = os.getenv("JWT_SECRET", "supersecretkeychangeinproduction")

    # Databases
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "postgresql+pg8000://postgres:postgres@localhost:5432/neuroscan")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/neuroscan")

    # Class labels — order MUST match the trained model's output layer
    CLASS_NAMES = ["Glioma", "Meningioma", "No Tumor", "Pituitary"]
    TUMOR_CLASSES = {"Glioma", "Meningioma", "Pituitary"}


class TestConfig(Config):
    """Configuration overrides used during pytest runs."""

    TESTING = True
