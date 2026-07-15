from flask import Blueprint
from controllers import auth_controller
from middlewares.auth_middleware import token_required

auth_bp = Blueprint('auth_bp', __name__, url_prefix='/api/v1/auth')

auth_bp.route('/register', methods=['POST'])(auth_controller.register)
auth_bp.route('/login', methods=['POST'])(auth_controller.login)
auth_bp.route('/refresh', methods=['POST'])(auth_controller.refresh)
auth_bp.route('/me', methods=['GET'])(token_required(auth_controller.get_me))
