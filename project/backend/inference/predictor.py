"""
Inference engine.

Loads the trained CNN exactly once (singleton pattern) and exposes a
single `predict` method. This module has no knowledge of Flask,
HTTP, or request/response formats — it's pure ML inference logic,
independent and unit-testable on its own.
"""

import logging

import torch

from config import Config
from models.cnn import CNN
from utils.preprocessing import preprocess_image

logger = logging.getLogger(__name__)


class Predictor:
    """Singleton wrapper around the loaded CNN model."""

    _instance = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._initialized = False
        return cls._instance

    def __init__(self, model_path: str = None):
        if self._initialized:
            return

        self.model_path = model_path or Config.MODEL_PATH
        self.device = torch.device("cpu")
        self.model = self._load_model()
        self._initialized = True
        logger.info("Model loaded from %s (device=%s)", self.model_path, self.device)

    def _load_model(self) -> CNN:
        model = CNN(num_classes=len(Config.CLASS_NAMES))
        state_dict = torch.load(self.model_path, map_location=self.device)
        model.load_state_dict(state_dict)
        model.eval()
        return model

    def predict(self, file_stream) -> dict:
        """
        Run inference on an uploaded image file stream.

        Returns:
            dict with keys: prediction (str), confidence (float 0-100),
            probabilities (dict[str, float] 0-100), is_tumor (bool).
        """
        tensor = preprocess_image(file_stream)

        with torch.no_grad():
            logits = self.model(tensor)
            probs = torch.softmax(logits, dim=1)[0]
            confidence, pred_idx = torch.max(probs, 0)

        prediction = Config.CLASS_NAMES[pred_idx.item()]
        probabilities = {
            Config.CLASS_NAMES[i]: round(probs[i].item() * 100, 2)
            for i in range(len(Config.CLASS_NAMES))
        }

        return {
            "prediction": prediction,
            "confidence": round(confidence.item() * 100, 2),
            "probabilities": probabilities,
            "is_tumor": prediction in Config.TUMOR_CLASSES,
        }


def get_predictor() -> Predictor:
    """Accessor used by the service layer to obtain the singleton instance."""
    return Predictor()
