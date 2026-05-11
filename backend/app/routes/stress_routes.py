"""Stress Routes — /api/stress/*"""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app.ml.stress_model import predict_stress

stress_bp = Blueprint('stress', __name__)


@stress_bp.route('/predict', methods=['POST'])
@jwt_required()
def predict():
    """Predict stress level from lifestyle data."""
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Request body is required'}), 400

    result = predict_stress(data)
    return jsonify(result), 200
