import logging
import os
from logging.handlers import RotatingFileHandler
from flask import request

def setup_logger(app):
    log_dir = os.path.join(app.root_path, 'logs')
    if not os.path.exists(log_dir):
        os.makedirs(log_dir)

    formatter = logging.Formatter(
        '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
    )

    file_handler = RotatingFileHandler(
        os.path.join(log_dir, 'neuroscan.log'),
        maxBytes=1024000,
        backupCount=10
    )
    file_handler.setFormatter(formatter)
    file_handler.setLevel(logging.INFO)

    app.logger.addHandler(file_handler)
    app.logger.setLevel(logging.INFO)
    app.logger.info('NeuroScan startup')

    # Add a hook to log requests
    @app.after_request
    def log_request(response):
        app.logger.info(f"{request.method} {request.path} - {response.status_code}")
        return response
