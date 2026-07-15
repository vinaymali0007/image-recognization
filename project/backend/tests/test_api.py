"""
API-level tests: health check and endpoint-level contract checks.
Run with: pytest tests/
"""

import io
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import pytest
from PIL import Image

from app import create_app
from config import TestConfig


@pytest.fixture
def client():
    app = create_app(TestConfig)
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


def make_test_image_bytes():
    img = Image.new("RGB", (64, 64), color=(120, 120, 120))
    buf = io.BytesIO()
    img.save(buf, format="JPEG")
    buf.seek(0)
    return buf


def test_health_endpoint(client):
    resp = client.get("/api/v1/health")
    assert resp.status_code == 200
    assert resp.get_json() == {"status": "UP"}


def test_predict_no_file(client):
    resp = client.post("/api/v1/predict", data={})
    assert resp.status_code == 400
    body = resp.get_json()
    assert body["success"] is False


def test_predict_invalid_extension(client):
    data = {"image": (io.BytesIO(b"not an image"), "test.txt")}
    resp = client.post("/api/v1/predict", data=data, content_type="multipart/form-data")
    assert resp.status_code == 415
    assert resp.get_json()["success"] is False


def test_predict_valid_image(client):
    image_bytes = make_test_image_bytes()
    data = {"image": (image_bytes, "test.jpg")}
    resp = client.post("/api/v1/predict", data=data, content_type="multipart/form-data")
    assert resp.status_code == 200
    body = resp.get_json()
    assert body["success"] is True
    assert body["prediction"] in [
        "Glioma", "Meningioma", "No Tumor", "Pituitary"
    ]
    assert 0 <= body["confidence"] <= 100
