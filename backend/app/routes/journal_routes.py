"""Journal Routes — /api/journal/*"""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.journal_model import JournalModel
from app.services.ai_service import AIService

journal_bp = Blueprint('journal', __name__)


@journal_bp.route('/analyze', methods=['POST'])
@jwt_required()
def analyze_journal():
    """Analyze a journal entry with AI and save it."""
    user_id = get_jwt_identity()
    data = request.get_json()

    title = data.get('title', 'Untitled Entry')
    content = data.get('content', '')

    if not content.strip():
        return jsonify({'error': 'Journal content is required'}), 400

    # Run AI analysis
    analysis = AIService.analyze_journal(content)

    # Save to database
    try:
        JournalModel.save_entry(user_id, title, content, analysis)
    except Exception:
        pass  # Still return analysis even if DB save fails

    return jsonify(analysis), 200


@journal_bp.route('/entries', methods=['GET'])
@jwt_required()
def get_entries():
    """Get journal entries for the logged-in user."""
    user_id = get_jwt_identity()
    try:
        entries = JournalModel.get_entries(user_id)
    except Exception:
        entries = []

    return jsonify({'entries': entries}), 200
