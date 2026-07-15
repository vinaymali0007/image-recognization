from flask import Blueprint
from controllers import report_controller
from middlewares.auth_middleware import token_required

report_bp = Blueprint("report_bp", __name__, url_prefix="/api/v1/report")

report_bp.route("/download/<id>", methods=["GET"])(token_required(report_controller.download_report))
report_bp.route("/delete/<id>", methods=["DELETE"])(token_required(report_controller.delete_report))
