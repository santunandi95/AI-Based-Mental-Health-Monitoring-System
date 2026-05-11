from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from app.config.settings import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Enable CORS
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Setup JWT
    jwt = JWTManager(app)

    @jwt.unauthorized_loader
    def unauthorized_callback(callback):
        return jsonify({'error': 'Missing Authorization Header'}), 401

    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        return jsonify({'error': 'Token has expired'}), 401

    # Register Blueprints
    from app.routes.auth_routes import auth_bp
    from app.routes.mood_routes import mood_bp
    from app.routes.journal_routes import journal_bp
    from app.routes.chatbot_routes import chatbot_bp
    from app.routes.stress_routes import stress_bp
    from app.routes.analytics_routes import analytics_bp
    from app.routes.admin_routes import admin_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(mood_bp, url_prefix='/api/mood')
    app.register_blueprint(journal_bp, url_prefix='/api/journal')
    app.register_blueprint(chatbot_bp, url_prefix='/api/chatbot')
    app.register_blueprint(stress_bp, url_prefix='/api/stress')
    app.register_blueprint(analytics_bp, url_prefix='/api/analytics')
    app.register_blueprint(admin_bp, url_prefix='/api/admin')

    @app.route('/health', methods=['GET'])
    def health_check():
        return jsonify({'status': 'healthy', 'message': 'MindCare AI API is running'})

    return app
