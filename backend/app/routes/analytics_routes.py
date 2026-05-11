"""Analytics Routes — /api/analytics/*"""
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

analytics_bp = Blueprint('analytics', __name__)


@analytics_bp.route('/summary', methods=['GET'])
@jwt_required()
def get_summary():
    """Get analytics summary for the dashboard."""
    # Returns mock data for now — will use real aggregations when data exists
    return jsonify({
        'moodScore': 74,
        'stressLevel': 32,
        'journalCount': 12,
        'chatSessions': 8,
        'streak': 5,
        'improvement': 12,
    }), 200
