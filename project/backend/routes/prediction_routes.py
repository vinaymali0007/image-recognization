from flask import Blueprint
from controllers import prediction_controller
from middlewares.auth_middleware import token_required, roles_accepted

prediction_bp = Blueprint("prediction_bp", __name__, url_prefix="/api/v1/predict")

prediction_bp.route("/", methods=["POST"])(token_required(roles_accepted('ADMIN', 'DOCTOR', 'RESEARCHER')(prediction_controller.handle_predict)))
prediction_bp.route("/history", methods=["GET"])(token_required(roles_accepted('ADMIN', 'DOCTOR', 'RESEARCHER')(prediction_controller.handle_history)))
prediction_bp.route("/<id>", methods=["GET"])(token_required(roles_accepted('ADMIN', 'DOCTOR', 'RESEARCHER')(prediction_controller.handle_details)))
prediction_bp.route("/<id>", methods=["DELETE"])(token_required(roles_accepted('ADMIN', 'DOCTOR', 'RESEARCHER')(prediction_controller.handle_delete)))
