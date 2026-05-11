"""
Chatbot Service — AI chatbot using Google Gemini API.
Falls back to rule-based responses if Gemini is unavailable.
"""
from app.config.settings import Config
from app.services.ai_service import AIService

# Try to import Gemini
try:
    import google.generativeai as genai
    if Config.GEMINI_API_KEY:
        genai.configure(api_key=Config.GEMINI_API_KEY)
        gemini_model = genai.GenerativeModel('gemini-2.0-flash')
        GEMINI_AVAILABLE = True
        print("[CHATBOT] Gemini AI configured successfully")
    else:
        GEMINI_AVAILABLE = False
        print("[CHATBOT] No Gemini API key found, using fallback responses")
except Exception as e:
    GEMINI_AVAILABLE = False
    gemini_model = None
    print(f"[CHATBOT] Gemini not available: {e}")


# System prompt for the chatbot
SYSTEM_PROMPT = """You are MindCare AI, a compassionate and supportive mental health companion chatbot.

Your role:
- Listen actively and respond with empathy
- Provide emotional support and validation
- Suggest healthy coping strategies
- Encourage professional help when appropriate
- Never diagnose or prescribe medication
- Keep responses concise (2-4 sentences)
- Be warm, caring, and non-judgmental

Important: You are NOT a replacement for professional mental health care.
If someone is in crisis, always recommend contacting emergency services or crisis helplines.
"""

# Fallback responses when Gemini is not available
FALLBACK_RESPONSES = {
    'greeting': "Hello! I'm MindCare AI, your mental wellness companion. How are you feeling today? I'm here to listen and support you.",
    'positive': "That's wonderful to hear! It's great that you're experiencing positive emotions. What's been contributing to your good mood?",
    'negative': "I'm sorry you're going through a tough time. Your feelings are valid, and it takes courage to express them. Would you like to talk about what's bothering you?",
    'anxious': "Anxiety can feel overwhelming, but you're not alone. Let's try a quick exercise: take 3 deep breaths - in for 4 seconds, hold for 4, out for 6. How does that feel?",
    'stressed': "Stress is your body's way of saying it needs attention. Have you been able to take any breaks today? Even 5 minutes of mindful breathing can help.",
    'default': "Thank you for sharing that with me. I'm here to support you. Would you like to explore some wellness techniques that might help?"
}


class ChatbotService:

    @staticmethod
    def get_response(message):
        """Get chatbot response — tries Gemini first, falls back to rules."""
        # Analyze sentiment of user message
        sentiment = AIService.analyze_sentiment(message)
        emotions = AIService.detect_emotions(message)

        if GEMINI_AVAILABLE:
            try:
                response = ChatbotService._gemini_response(message)
                return {
                    'response': response,
                    'sentiment': sentiment['sentiment'],
                    'emotions': emotions,
                }
            except Exception as e:
                print(f"[CHATBOT] Gemini error, using fallback: {e}")

        # Fallback response
        response = ChatbotService._fallback_response(message, sentiment, emotions)
        return {
            'response': response,
            'sentiment': sentiment['sentiment'],
            'emotions': emotions,
        }

    @staticmethod
    def _gemini_response(message):
        """Get response from Gemini API."""
        chat = gemini_model.start_chat(history=[])
        full_prompt = f"{SYSTEM_PROMPT}\n\nUser message: {message}"
        response = chat.send_message(full_prompt)
        return response.text

    @staticmethod
    def _fallback_response(message, sentiment, emotions):
        """Generate rule-based response."""
        msg_lower = message.lower()

        # Check for greetings
        if any(w in msg_lower for w in ['hello', 'hi', 'hey', 'good morning', 'good evening']):
            return FALLBACK_RESPONSES['greeting']

        # Check by detected emotions
        if 'Anxious' in emotions:
            return FALLBACK_RESPONSES['anxious']
        if 'Stressed' in emotions:
            return FALLBACK_RESPONSES['stressed']

        # Check by sentiment
        if sentiment['sentiment'] == 'Positive':
            return FALLBACK_RESPONSES['positive']
        elif sentiment['sentiment'] == 'Negative':
            return FALLBACK_RESPONSES['negative']

        return FALLBACK_RESPONSES['default']
