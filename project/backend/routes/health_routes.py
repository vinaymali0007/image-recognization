"""Route registration for the health-check endpoint."""

from flask import Blueprint, jsonify

health_bp = Blueprint("health", __name__, url_prefix="/api/v1")


@health_bp.route("/health", methods=["GET"])
def health():
    """Simple liveness probe used by Docker/monitoring."""
    return jsonify({"status": "UP"}), 200
