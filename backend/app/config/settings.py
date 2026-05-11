import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    """Flask configuration loaded from .env file."""
    SECRET_KEY     = os.getenv('SECRET_KEY', 'fallback-secret')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'fallback-jwt-secret')
    MONGO_URI      = os.getenv('MONGO_URI', 'mongodb://localhost:27017/mindcare_db')
    GEMINI_API_KEY = os.getenv('GEMINI_API_KEY', '')
    PORT           = int(os.getenv('PORT', 5000))
    DEBUG          = os.getenv('FLASK_ENV', 'production') == 'development'
