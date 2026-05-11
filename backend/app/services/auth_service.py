"""
Auth Service — Business logic for authentication.
Handles password hashing, token generation, and validation.
"""
import bcrypt
from app.models.user_model import UserModel
from flask_jwt_extended import create_access_token
from datetime import timedelta


class AuthService:

    @staticmethod
    def register(name, email, password):
        """Register a new user."""
        # Check if user already exists
        existing = UserModel.find_by_email(email)
        if existing:
            return None, 'Email already registered'

        # Hash password with bcrypt
        hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        user = UserModel.create_user(name, email, hashed)
        return UserModel.serialize(user), None

    @staticmethod
    def login(email, password):
        """Authenticate user and return JWT token."""
        user = UserModel.find_by_email(email)
        if not user:
            return None, None, 'Invalid email or password'

        # Verify password
        if not bcrypt.checkpw(password.encode('utf-8'), user['password']):
            return None, None, 'Invalid email or password'

        # Generate JWT token (expires in 24 hours)
        token = create_access_token(
            identity=str(user['_id']),
            expires_delta=timedelta(hours=24),
            additional_claims={'role': user.get('role', 'user')}
        )

        return UserModel.serialize(user), token, None

    @staticmethod
    def get_profile(user_id):
        """Get user profile by ID."""
        user = UserModel.find_by_id(user_id)
        if not user:
            return None, 'User not found'
        return UserModel.serialize(user), None

    @staticmethod
    def update_profile(user_id, data):
        """Update user profile."""
        user = UserModel.update_profile(user_id, data)
        if not user:
            return None, 'User not found'
        return UserModel.serialize(user), None
