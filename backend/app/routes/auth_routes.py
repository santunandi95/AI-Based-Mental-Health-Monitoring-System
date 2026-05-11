"""Auth Routes — /api/auth/*"""
from flask import Blueprint
from app.controllers.auth_controller import AuthController
from flask_jwt_extended import jwt_required

auth_bp = Blueprint('auth', __name__)

auth_bp.route('/register', methods=['POST'])(AuthController.register)
auth_bp.route('/login', methods=['POST'])(AuthController.login)

@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    return AuthController.get_profile()

@auth_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    return AuthController.update_profile()
