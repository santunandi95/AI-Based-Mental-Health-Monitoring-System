"""
Mood Model — MongoDB operations for mood entries.
"""
from datetime import datetime
from bson import ObjectId
from app.utils.db import db

_MOCK_MOODS = []

class MoodModel:
    collection = db['moods'] if db is not None else None

    @staticmethod
    def log_mood(user_id, emotion, note='', score=None):
        """Log a mood entry."""
        entry = {
            'user_id': str(user_id) if MoodModel.collection is None else ObjectId(user_id),
            'emotion': emotion,
            'note': note,
            'score': score,
            'date': datetime.utcnow().strftime('%Y-%m-%d'),
            'created_at': datetime.utcnow(),
        }
        
        if MoodModel.collection is not None:
            MoodModel.collection.insert_one(entry)
        else:
            entry['_id'] = ObjectId()
            _MOCK_MOODS.append(entry)
            
        return entry

    @staticmethod
    def get_history(user_id, limit=30):
        """Get mood history for a user."""
        if MoodModel.collection is not None:
            moods = MoodModel.collection.find(
                {'user_id': ObjectId(user_id)}
            ).sort('created_at', -1).limit(limit)
            return [MoodModel.serialize(m) for m in moods]
        else:
            moods = [m for m in _MOCK_MOODS if str(m['user_id']) == str(user_id)]
            moods.sort(key=lambda x: x['created_at'], reverse=True)
            return [MoodModel.serialize(m) for m in moods[:limit]]

    @staticmethod
    def serialize(mood):
        return {
            'id': str(mood.get('_id', '')),
            'emotion': mood.get('emotion', ''),
            'note': mood.get('note', ''),
            'score': mood.get('score'),
            'date': mood.get('date', ''),
        }
