"""
Auth Controller — Handles HTTP requests for authentication.
"""
from flask import request, jsonify
from app.services.auth_service import AuthService
from flask_jwt_extended import get_jwt_identity


class AuthController:

    @staticmethod
    def register():
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Request body is required'}), 400

        name     = data.get('name', '').strip()
        email    = data.get('email', '').strip()
        password = data.get('password', '')

        if not name or not email or not password:
            return jsonify({'error': 'Name, email, and password are required'}), 400
        if len(password) < 6:
            return jsonify({'error': 'Password must be at least 6 characters'}), 400

        user, error = AuthService.register(name, email, password)
        if error:
            return jsonify({'error': error}), 409

        return jsonify({'message': 'User registered successfully', 'user': user}), 201

    @staticmethod
    def login():
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Request body is required'}), 400

        email    = data.get('email', '').strip()
        password = data.get('password', '')

        if not email or not password:
            return jsonify({'error': 'Email and password are required'}), 400

        user, token, error = AuthService.login(email, password)
        if error:
            return jsonify({'error': error}), 401

        return jsonify({'message': 'Login successful', 'user': user, 'token': token}), 200

    @staticmethod
    def get_profile():
        user_id = get_jwt_identity()
        user, error = AuthService.get_profile(user_id)
        if error:
            return jsonify({'error': error}), 404
        return jsonify({'user': user}), 200

    @staticmethod
    def update_profile():
        user_id = get_jwt_identity()
        data = request.get_json()
        user, error = AuthService.update_profile(user_id, data)
        if error:
            return jsonify({'error': error}), 404
        return jsonify({'message': 'Profile updated', 'user': user}), 200
