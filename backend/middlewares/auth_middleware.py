from functools import wraps
from flask import request, g, jsonify
from security.auth import decode_token

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            if auth_header.startswith('Bearer '):
                token = auth_header.split(' ')[1]
        
        if not token:
            return jsonify({'error': 'Token is missing'}), 401
            
        payload = decode_token(token)
        if not payload or payload.get('type') != 'access':
            return jsonify({'error': 'Token is invalid or expired'}), 401
            
        g.user_id = payload.get('user_id')
        g.role = payload.get('role')
        
        return f(*args, **kwargs)
    return decorated

def roles_accepted(*roles):
    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            if not hasattr(g, 'role') or g.role not in roles:
                return jsonify({'error': 'Insufficient permissions'}), 403
            return f(*args, **kwargs)
        return decorated
    return decorator
