from pymongo import MongoClient
from app.config.settings import Config

# Create MongoDB client with timeout
try:
    client = MongoClient(Config.MONGO_URI, serverSelectionTimeoutMS=2000)
    # Ping the server to force connection check immediately
    client.admin.command('ping')
    db = client.get_default_database() if '/' in Config.MONGO_URI.split('://')[-1] else client['mindcare_db']
    print("[DB] MongoDB connected successfully")
except Exception as e:
    print(f"[DB] MongoDB connection warning: {e}")
    print("[DB] App will run but database features will use in-memory fallback")
    db = None
