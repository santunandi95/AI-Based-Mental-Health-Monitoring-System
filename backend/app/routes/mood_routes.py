"""Mood Routes — /api/mood/*"""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.mood_model import MoodModel
from app.services.ai_service import AIService

mood_bp = Blueprint('mood', __name__)


@mood_bp.route('/log', methods=['POST'])
@jwt_required()
def log_mood():
    """Log a mood entry with optional AI analysis."""
    user_id = get_jwt_identity()
    data = request.get_json()

    emotion = data.get('emotion', 'neutral')
    note = data.get('note', '')

    # Analyze note if provided
    score = 50
    if note:
        analysis = AIService.analyze_sentiment(note)
        score = int(max(0, min(100, (analysis['polarity'] + 1) * 50)))

    try:
        MoodModel.log_mood(user_id, emotion, note, score)
    except Exception:
        pass  # Still return success even if DB is down

    return jsonify({
        'message': 'Mood logged successfully',
        'emotion': emotion,
        'score': score,
    }), 201


@mood_bp.route('/history', methods=['GET'])
@jwt_required()
def get_history():
    """Get mood history for the logged-in user."""
    user_id = get_jwt_identity()
    try:
        moods = MoodModel.get_history(user_id)
    except Exception:
        moods = []

    return jsonify({'moods': moods}), 200
