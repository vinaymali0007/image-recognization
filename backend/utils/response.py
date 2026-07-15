"""
Standardized JSON response builders so every endpoint returns the
same success/error envelope shape.
"""

from flask import jsonify


def success_response(data: dict, status_code: int = 200):
    """Build a consistent success JSON response."""
    payload = {"success": True, **data}
    return jsonify(payload), status_code


def error_response(message: str, status_code: int = 400):
    """Build a consistent error JSON response."""
    return jsonify({"success": False, "message": message}), status_code
