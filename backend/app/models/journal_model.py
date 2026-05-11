"""
Journal Model — MongoDB operations for journal entries.
"""
from datetime import datetime
from bson import ObjectId
from app.utils.db import db

_MOCK_JOURNALS = []

class JournalModel:
    collection = db['journals'] if db is not None else None

    @staticmethod
    def save_entry(user_id, title, content, analysis=None):
        """Save a journal entry with AI analysis."""
        entry = {
            'user_id': str(user_id) if JournalModel.collection is None else ObjectId(user_id),
            'title': title,
            'content': content,
            'sentiment': analysis.get('sentiment', 'Neutral') if analysis else 'Neutral',
            'score': analysis.get('score', 50) if analysis else 50,
            'emotions': analysis.get('emotions', []) if analysis else [],
            'keywords': analysis.get('keywords', []) if analysis else [],
            'date': datetime.utcnow().strftime('%Y-%m-%d'),
            'created_at': datetime.utcnow(),
        }
        
        if JournalModel.collection is not None:
            JournalModel.collection.insert_one(entry)
        else:
            entry['_id'] = ObjectId()
            _MOCK_JOURNALS.append(entry)
            
        return entry

    @staticmethod
    def get_entries(user_id, limit=20):
        """Get journal entries for a user."""
        if JournalModel.collection is not None:
            entries = JournalModel.collection.find(
                {'user_id': ObjectId(user_id)}
            ).sort('created_at', -1).limit(limit)
            return [JournalModel.serialize(e) for e in entries]
        else:
            entries = [e for e in _MOCK_JOURNALS if str(e['user_id']) == str(user_id)]
            entries.sort(key=lambda x: x['created_at'], reverse=True)
            return [JournalModel.serialize(e) for e in entries[:limit]]

    @staticmethod
    def serialize(entry):
        return {
            'id': str(entry.get('_id', '')),
            'title': entry.get('title', ''),
            'content': entry.get('content', ''),
            'sentiment': entry.get('sentiment', 'Neutral'),
            'score': entry.get('score', 50),
            'emotions': entry.get('emotions', []),
            'keywords': entry.get('keywords', []),
            'date': entry.get('date', ''),
        }
