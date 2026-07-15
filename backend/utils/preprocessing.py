"""
Image preprocessing utilities.

Reproduces exactly the transform pipeline used by the original
Streamlit app: RGB conversion, resize to 32x32, tensor conversion,
batch dimension added.
"""

from io import BytesIO

import torch
from PIL import Image
from torchvision import transforms

_transform = transforms.Compose([
    transforms.Resize((32, 32)),
    transforms.ToTensor(),
])


def preprocess_image(file_stream) -> torch.Tensor:
    """
    Convert an uploaded image file stream into a model-ready tensor.

    Args:
        file_stream: A file-like object (e.g. Flask's request.files['image']).

    Returns:
        A (1, 3, 32, 32) float tensor ready to feed into the CNN.

    Raises:
        ValueError: If the file cannot be opened as a valid image.
    """
    try:
        image_bytes = file_stream.read()
        image = Image.open(BytesIO(image_bytes)).convert("RGB")
    except Exception as exc:
        raise ValueError("Corrupted or unreadable image file") from exc

    tensor = _transform(image)
    return tensor.unsqueeze(0)
