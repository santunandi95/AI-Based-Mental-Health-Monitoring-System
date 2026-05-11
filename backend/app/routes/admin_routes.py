"""Admin Routes — /api/admin/*"""
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.user_model import UserModel

admin_bp = Blueprint('admin', __name__)


@admin_bp.route('/users', methods=['GET'])
@jwt_required()
def get_all_users():
    """Get all users (admin only)."""
    user_id = get_jwt_identity()
    try:
        user = UserModel.find_by_id(user_id)
        if not user or user.get('role') != 'admin':
            return jsonify({'error': 'Admin access required'}), 403
        users = UserModel.get_all_users()
    except Exception:
        users = []

    return jsonify({'users': users}), 200
