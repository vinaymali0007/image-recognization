"""
Request validation helpers for the prediction endpoint.

Keeping validation here (rather than inline in the controller) keeps
the controller thin and makes each rule independently testable.
"""

from config import Config


class ValidationError(Exception):
    """Raised when an incoming request fails validation. Carries an HTTP status."""

    def __init__(self, message: str, status_code: int = 400):
        super().__init__(message)
        self.message = message
        self.status_code = status_code


def _has_allowed_extension(filename: str) -> bool:
    if "." not in filename:
        return False
    ext = filename.rsplit(".", 1)[1].lower()
    return ext in Config.ALLOWED_EXTENSIONS


def validate_prediction_request(files) -> None:
    """
    Validate an incoming multipart/form-data prediction request.

    Args:
        files: Flask's `request.files` MultiDict.

    Raises:
        ValidationError: with an appropriate message and HTTP status code.
    """
    if "image" not in files or files.get("image") is None:
        raise ValidationError("No image file provided in request", 400)

    upload = files["image"]

    if upload.filename == "":
        raise ValidationError("Empty file provided", 400)

    if len(files) > 1 or len(files.getlist("image")) > 1:
        raise ValidationError("Only a single image may be uploaded per request", 400)

    if not _has_allowed_extension(upload.filename):
        raise ValidationError(
            "Unsupported image format. Allowed: jpg, jpeg, png", 415
        )

    # Determine size without loading the whole file into memory twice.
    upload.stream.seek(0, 2)
    size = upload.stream.tell()
    upload.stream.seek(0)

    if size == 0:
        raise ValidationError("Empty file provided", 400)

    if size > Config.MAX_UPLOAD_SIZE:
        raise ValidationError(
            f"File exceeds maximum upload size of {Config.MAX_UPLOAD_SIZE // (1024*1024)}MB",
            413,
        )
