"""
User Model — MongoDB operations for the 'users' collection.
Gracefully falls back to in-memory storage if MongoDB is unavailable.
"""
from datetime import datetime
from bson import ObjectId
from app.utils.db import db

# In-memory fallbacks
_MOCK_USERS = []

class UserModel:
    collection = db['users'] if db is not None else None

    @staticmethod
    def create_user(name, email, hashed_password):
        """Insert a new user into the database."""
        user = {
            'name': name,
            'email': email.lower().strip(),
            'password': hashed_password,
            'role': 'user',
            'age': None,
            'bio': '',
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow(),
        }
        
        if UserModel.collection is not None:
            result = UserModel.collection.insert_one(user)
            user['_id'] = result.inserted_id
        else:
            user['_id'] = ObjectId()  # Generate random ObjectId for mock
            _MOCK_USERS.append(user)
            
        return user

    @staticmethod
    def find_by_email(email):
        """Find user by email address."""
        if UserModel.collection is not None:
            return UserModel.collection.find_one({'email': email.lower().strip()})
        else:
            return next((u for u in _MOCK_USERS if u['email'] == email.lower().strip()), None)

    @staticmethod
    def find_by_id(user_id):
        """Find user by ObjectId."""
        if UserModel.collection is not None:
            return UserModel.collection.find_one({'_id': ObjectId(user_id)})
        else:
            return next((u for u in _MOCK_USERS if str(u['_id']) == str(user_id)), None)

    @staticmethod
    def update_profile(user_id, data):
        """Update user profile fields."""
        allowed = {'name', 'age', 'bio', 'email'}
        update = {k: v for k, v in data.items() if k in allowed}
        update['updated_at'] = datetime.utcnow()
        
        if UserModel.collection is not None:
            UserModel.collection.update_one(
                {'_id': ObjectId(user_id)},
                {'$set': update}
            )
            return UserModel.find_by_id(user_id)
        else:
            user = UserModel.find_by_id(user_id)
            if user:
                user.update(update)
            return user

    @staticmethod
    def get_all_users():
        """Get all users (admin)."""
        if UserModel.collection is not None:
            users = UserModel.collection.find({}, {'password': 0})
            return [UserModel.serialize(u) for u in users]
        else:
            return [UserModel.serialize(u) for u in _MOCK_USERS]

    @staticmethod
    def serialize(user):
        """Convert MongoDB document to JSON-safe dict."""
        if not user:
            return None
        return {
            'id': str(user.get('_id', '')),
            'name': user.get('name', ''),
            'email': user.get('email', ''),
            'role': user.get('role', 'user'),
            'age': user.get('age'),
            'bio': user.get('bio', ''),
            'created_at': str(user.get('created_at', '')),
            'updated_at': str(user.get('updated_at', '')),
        }
