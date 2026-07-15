"""
Flask application entry point.

Uses the app-factory pattern so the app can be constructed
differently for production, development, and tests.
"""

import os
from flask import Flask
from flask_cors import CORS
from flasgger import Swagger

from config import Config
from extensions import db
from repositories.mongo_repository import mongo_repo
from utils.logger import setup_logger
from utils.database import create_database_if_not_exists

from routes.health_routes import health_bp
from routes.auth_routes import auth_bp
from routes.prediction_routes import prediction_bp
from routes.report_routes import report_bp

from inference.predictor import get_predictor
from utils.response import error_response


def create_app(config_object=Config) -> Flask:
    """Application factory."""

    app = Flask(__name__)
    app.config.from_object(config_object)
    app.config["MAX_CONTENT_LENGTH"] = config_object.MAX_UPLOAD_SIZE

    # Initialize logger
    setup_logger(app)
    logger = app.logger

    # Enable CORS
    CORS(
        app,
        resources={
            r"/api/*": {
                "origins": config_object.CORS_ORIGINS
            }
        }
    )

    # ---------------------------------------------------------
    # Automatically create PostgreSQL database if it doesn't exist
    # ---------------------------------------------------------
    create_database_if_not_exists(app.config["SQLALCHEMY_DATABASE_URI"])

    # Initialize database connections
    db.init_app(app)
    mongo_repo.init_app(app)

    # Swagger Configuration
    swagger_config = {
        "headers": [],
        "specs": [
            {
                "endpoint": "apispec_1",
                "route": "/apispec_1.json",
                "rule_filter": lambda rule: True,
                "model_filter": lambda tag: True,
            }
        ],
        "static_url_path": "/flasgger_static",
        "swagger_ui": True,
        "specs_route": "/swagger/",
    }

    swagger_template_path = os.path.join(
        app.root_path,
        "docs",
        "swagger.yml"
    )

    Swagger(
        app,
        template_file=swagger_template_path,
        config=swagger_config,
    )

    # Register API Blueprints
    app.register_blueprint(health_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(prediction_bp)
    app.register_blueprint(report_bp)

    # Load AI Model
    try:
        get_predictor()
        logger.info("Application startup complete. Model ready.")
    except Exception as e:
        logger.error(f"Error loading predictor: {e}")

    # Create uploads folder
    upload_dir = app.config.get("UPLOAD_FOLDER", "uploads")

    if not os.path.exists(upload_dir):
        os.makedirs(upload_dir)

    # ---------------------------------------------------------
    # Automatically create all SQLAlchemy tables
    # ---------------------------------------------------------
    with app.app_context():
        db.create_all()

    # ---------------- Error Handlers ---------------- #

    @app.errorhandler(400)
    def handle_bad_request(e):
        return error_response(
            str(e.description) if hasattr(e, "description") else "Bad request",
            400,
        )

    @app.errorhandler(401)
    def handle_unauthorized(e):
        return error_response("Unauthorized", 401)

    @app.errorhandler(403)
    def handle_forbidden(e):
        return error_response("Forbidden", 403)

    @app.errorhandler(404)
    def handle_not_found(e):
        return error_response("Resource not found", 404)

    @app.errorhandler(409)
    def handle_conflict(e):
        return error_response(
            str(e.description) if hasattr(e, "description") else "Conflict",
            409,
        )

    @app.errorhandler(413)
    def handle_too_large(e):
        return error_response(
            "File exceeds maximum upload size",
            413,
        )

    @app.errorhandler(415)
    def handle_unsupported_media_type(e):
        return error_response(
            "Unsupported Media Type",
            415,
        )

    @app.errorhandler(422)
    def handle_unprocessable_entity(e):
        return error_response(
            "Unprocessable Entity",
            422,
        )

    @app.errorhandler(500)
    def handle_server_error(e):
        logger.exception("Internal Server Error")
        return error_response(
            "Internal server error",
            500,
        )

    return app


app = create_app()


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=Config.PORT,
        debug=Config.DEBUG,
    )