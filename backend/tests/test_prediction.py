"""
Unit tests for preprocessing, validation, and the inference engine
in isolation from the Flask HTTP layer.
"""

import io
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import pytest
from PIL import Image
from werkzeug.datastructures import FileStorage

from utils.preprocessing import preprocess_image
from utils.validation import validate_prediction_request, ValidationError
from inference.predictor import get_predictor


def make_image_storage(fmt="JPEG", filename="test.jpg", size=(100, 100)):
    img = Image.new("RGB", size, color=(10, 200, 30))
    buf = io.BytesIO()
    img.save(buf, format=fmt)
    buf.seek(0)
    return FileStorage(stream=buf, filename=filename)


def test_preprocess_image_shape():
    storage = make_image_storage()
    tensor = preprocess_image(storage.stream)
    assert tensor.shape == (1, 3, 32, 32)


def test_preprocess_image_corrupted_raises():
    bad_stream = io.BytesIO(b"this is not an image")
    with pytest.raises(ValueError):
        preprocess_image(bad_stream)


def test_validation_rejects_bad_extension():
    from werkzeug.datastructures import FileStorage, MultiDict
    storage = FileStorage(stream=io.BytesIO(b"x"), filename="scan.gif")
    files = MultiDict({"image": storage})
    with pytest.raises(ValidationError):
        validate_prediction_request(files)


def test_predictor_returns_expected_keys():
    predictor = get_predictor()
    storage = make_image_storage()
    result = predictor.predict(storage.stream)
    assert set(result.keys()) == {
        "prediction", "confidence", "probabilities", "is_tumor"
    }
    assert len(result["probabilities"]) == 4
