"""Chatbot Routes — /api/chatbot/*"""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app.services.chatbot_service import ChatbotService

chatbot_bp = Blueprint('chatbot', __name__)


@chatbot_bp.route('/message', methods=['POST'])
@jwt_required()
def send_message():
    """Send a message to the AI chatbot."""
    data = request.get_json()
    message = data.get('message', '')

    if not message.strip():
        return jsonify({'error': 'Message is required'}), 400

    result = ChatbotService.get_response(message)
    return jsonify(result), 200
