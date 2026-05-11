"""
AI Service — Sentiment analysis, emotion detection, and recommendations.
Uses TextBlob for NLP and custom logic for emotion classification.
"""
from textblob import TextBlob


class AIService:

    # Emotion keywords mapping
    EMOTION_KEYWORDS = {
        'Happy':    ['happy', 'joy', 'excited', 'great', 'wonderful', 'amazing', 'love', 'fantastic', 'awesome', 'glad', 'cheerful', 'delighted', 'pleased', 'thrilled'],
        'Sad':      ['sad', 'unhappy', 'depressed', 'down', 'miserable', 'heartbroken', 'lonely', 'grief', 'sorrow', 'cry', 'tears', 'gloomy', 'melancholy'],
        'Angry':    ['angry', 'mad', 'furious', 'irritated', 'annoyed', 'frustrated', 'rage', 'hate', 'hostile', 'outraged', 'agitated'],
        'Anxious':  ['anxious', 'worried', 'nervous', 'scared', 'fear', 'panic', 'uneasy', 'tense', 'dread', 'apprehensive', 'overwhelmed'],
        'Stressed': ['stressed', 'pressure', 'burden', 'exhausted', 'burned', 'overworked', 'tired', 'fatigue', 'strained', 'deadline', 'overwhelmed'],
        'Calm':     ['calm', 'peaceful', 'relaxed', 'serene', 'tranquil', 'content', 'mindful', 'meditate', 'zen', 'comfortable'],
    }

    # Wellness recommendations based on emotions
    RECOMMENDATIONS = {
        'Happy':    ['Keep a gratitude journal', 'Share your positivity with others', 'Try a new hobby while your energy is high'],
        'Sad':      ['Listen to uplifting music', 'Talk to a trusted friend', 'Try gentle exercise like a walk', 'Practice self-compassion'],
        'Angry':    ['Try deep breathing (4-7-8 technique)', 'Go for a run to release tension', 'Write down your feelings', 'Count to 10 slowly'],
        'Anxious':  ['Practice grounding (5-4-3-2-1 technique)', 'Try progressive muscle relaxation', 'Limit caffeine intake', 'Do a guided meditation'],
        'Stressed': ['Take short breaks every 90 minutes', 'Try 10-minute yoga sessions', 'Prioritize sleep tonight', 'Delegate tasks where possible'],
        'Calm':     ['Maintain this balance with regular meditation', 'Share your coping strategies', 'Set goals while feeling centered'],
        'Neutral':  ['Try journaling to explore deeper feelings', 'Engage in a creative activity', 'Connect with someone you care about'],
    }

    @staticmethod
    def analyze_sentiment(text):
        """Analyze text sentiment using TextBlob."""
        if not text or not text.strip():
            return {'sentiment': 'Neutral', 'polarity': 0, 'subjectivity': 0}

        blob = TextBlob(text)
        polarity = blob.sentiment.polarity        # -1 to 1
        subjectivity = blob.sentiment.subjectivity  # 0 to 1

        if polarity > 0.1:
            sentiment = 'Positive'
        elif polarity < -0.1:
            sentiment = 'Negative'
        else:
            sentiment = 'Neutral'

        return {
            'sentiment': sentiment,
            'polarity': round(polarity, 3),
            'subjectivity': round(subjectivity, 3),
        }

    @staticmethod
    def detect_emotions(text):
        """Detect emotions from text using keyword matching."""
        if not text:
            return ['Neutral']

        text_lower = text.lower()
        detected = []

        for emotion, keywords in AIService.EMOTION_KEYWORDS.items():
            for kw in keywords:
                if kw in text_lower:
                    if emotion not in detected:
                        detected.append(emotion)
                    break

        return detected if detected else ['Neutral']

    @staticmethod
    def extract_keywords(text, max_keywords=5):
        """Extract important keywords/noun phrases from text."""
        if not text:
            return []

        blob = TextBlob(text)
        # Get noun phrases
        phrases = list(blob.noun_phrases)[:max_keywords]

        # If not enough noun phrases, add important words
        if len(phrases) < max_keywords:
            words = [w.lower() for w in blob.words if len(w) > 3]
            for w in words:
                if w not in phrases and len(phrases) < max_keywords:
                    phrases.append(w)

        return phrases[:max_keywords]

    @staticmethod
    def analyze_journal(text):
        """Full journal analysis — sentiment + emotions + keywords + score + suggestions."""
        sentiment_data = AIService.analyze_sentiment(text)
        emotions = AIService.detect_emotions(text)
        keywords = AIService.extract_keywords(text)

        # Calculate wellness score (0-100)
        polarity = sentiment_data['polarity']
        score = int(max(0, min(100, (polarity + 1) * 50)))

        # Get recommendations based on primary emotion
        primary_emotion = emotions[0] if emotions else 'Neutral'
        suggestions = AIService.RECOMMENDATIONS.get(primary_emotion, AIService.RECOMMENDATIONS['Neutral'])
        suggestion = suggestions[0] if suggestions else 'Keep expressing your feelings through journaling.'

        return {
            'sentiment': sentiment_data['sentiment'],
            'score': score,
            'emotions': emotions,
            'keywords': keywords,
            'suggestion': suggestion,
            'polarity': sentiment_data['polarity'],
            'subjectivity': sentiment_data['subjectivity'],
        }

    @staticmethod
    def get_recommendations(emotion):
        """Get wellness recommendations for an emotion."""
        return AIService.RECOMMENDATIONS.get(emotion, AIService.RECOMMENDATIONS['Neutral'])
