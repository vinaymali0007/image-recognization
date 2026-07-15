from flask import request, jsonify
from datetime import datetime
from models.user import User
from extensions import db
from security.auth import hash_password, check_password, generate_tokens, decode_token

def register():
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password') or not data.get('name'):
        return jsonify({'error': 'Missing required fields'}), 400
        
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already exists'}), 409
        
    allowed_roles = ['ADMIN', 'DOCTOR', 'RESEARCHER', 'USER']
    role = data.get('role', 'USER')
    if role not in allowed_roles:
        return jsonify({'error': 'Invalid role'}), 400

    hashed_pw = hash_password(data['password'])
    new_user = User(
        name=data['name'],
        email=data['email'],
        password_hash=hashed_pw,
        organization=data.get('organization'),
        role=role
    )
    
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({
        'message': 'User registered successfully',
        'user_id': new_user.id
    }), 201

def login():
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Missing required fields'}), 400
        
    user = User.query.filter_by(email=data['email']).first()
    if not user or not check_password(data['password'], user.password_hash):
        return jsonify({'error': 'Invalid credentials'}), 401
        
    if data.get('role') and user.role != data.get('role'):
        return jsonify({'error': 'Role mismatch. Please select your correct role.'}), 401
        
    user.last_login = datetime.utcnow()
    db.session.commit()
    
    access_token, refresh_token = generate_tokens(user.id, user.role)
    
    return jsonify({
        'message': 'Login successful',
        'access_token': access_token,
        'refresh_token': refresh_token,
        'user': {
            'id': user.id,
            'name': user.name,
            'email': user.email,
            'role': user.role
        }
    }), 200

def refresh():
    data = request.get_json()
    if not data or not data.get('refresh_token'):
        return jsonify({'error': 'Missing refresh token'}), 400
        
    payload = decode_token(data['refresh_token'])
    if not payload or payload.get('type') != 'refresh':
        return jsonify({'error': 'Invalid or expired refresh token'}), 401
        
    user = User.query.get(payload['user_id'])
    if not user:
        return jsonify({'error': 'User not found'}), 404
        
    access_token, refresh_token = generate_tokens(user.id, user.role)
    return jsonify({
        'access_token': access_token,
        'refresh_token': refresh_token
    }), 200
    
def get_me():
    from flask import g
    user = User.query.get(g.user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    return jsonify({
        'id': user.id,
        'name': user.name,
        'email': user.email,
        'role': user.role,
        'organization': user.organization
    }), 200
