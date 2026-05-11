"""
Stress Prediction Model — Uses scikit-learn to predict stress levels.
Generates a synthetic dataset and trains a RandomForestClassifier.
"""
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
import warnings
warnings.filterwarnings('ignore')

# Train model on startup with synthetic data
print("[ML] Training stress prediction model...")

# Generate synthetic training data
np.random.seed(42)
n_samples = 500

sleep       = np.random.uniform(3, 12, n_samples)
exercise    = np.random.uniform(0, 5, n_samples)
work        = np.random.uniform(2, 16, n_samples)
social      = np.random.uniform(0, 8, n_samples)
screen      = np.random.uniform(1, 16, n_samples)
caffeine    = np.random.randint(0, 10, n_samples)
meditation  = np.random.randint(0, 2, n_samples)
therapy     = np.random.randint(0, 2, n_samples)

# Calculate stress score based on realistic factors
stress_score = (
    100
    - sleep * 6
    - exercise * 8
    - social * 3
    + work * 4
    + screen * 2
    + caffeine * 3
    - meditation * 15
    - therapy * 10
    + np.random.normal(0, 8, n_samples)
)
stress_score = np.clip(stress_score, 5, 95).astype(int)

# Create labels: 0=Low, 1=Moderate, 2=High
labels = np.where(stress_score >= 70, 2, np.where(stress_score >= 40, 1, 0))

# Build feature matrix
X = np.column_stack([sleep, exercise, work, social, screen, caffeine, meditation, therapy])

# Scale features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42, max_depth=10)
model.fit(X_scaled, labels)
print("[ML] Stress model trained successfully")


def predict_stress(data):
    """
    Predict stress level from lifestyle data.
    Returns: { score: int, level: str, suggestions: list }
    """
    features = np.array([[
        data.get('sleep_hours', 7),
        data.get('exercise_hours', 1),
        data.get('work_hours', 8),
        data.get('social_hours', 2),
        data.get('screen_hours', 5),
        data.get('caffeine', 2),
        1 if data.get('meditation') else 0,
        1 if data.get('therapy') else 0,
    ]])

    features_scaled = scaler.transform(features)
    prediction = model.predict(features_scaled)[0]
    probabilities = model.predict_proba(features_scaled)[0]

    # Calculate a continuous score (0-100)
    score = int(probabilities[2] * 100 * 0.6 + probabilities[1] * 100 * 0.35 + probabilities[0] * 100 * 0.05)
    score = max(5, min(95, score))

    levels = {0: 'Low', 1: 'Moderate', 2: 'High'}
    level = levels[prediction]

    # Generate personalized suggestions
    suggestions = []
    if data.get('sleep_hours', 7) < 7:
        suggestions.append('Try to get 7-8 hours of sleep for better mental health')
    if data.get('exercise_hours', 1) < 1:
        suggestions.append('Add 30 minutes of exercise daily to reduce stress')
    if data.get('work_hours', 8) > 9:
        suggestions.append('Consider setting boundaries for work hours')
    if data.get('screen_hours', 5) > 6:
        suggestions.append('Reduce screen time, especially 1 hour before bed')
    if data.get('caffeine', 2) > 3:
        suggestions.append('Limit caffeine to 2-3 cups per day')
    if not data.get('meditation'):
        suggestions.append('Try 10 minutes of daily meditation')
    if not data.get('therapy') and prediction == 2:
        suggestions.append('Consider speaking with a mental health professional')
    if data.get('social_hours', 2) < 1:
        suggestions.append('Increase social interactions for emotional support')

    if not suggestions:
        suggestions.append('Your lifestyle looks balanced! Keep maintaining these healthy habits.')

    return {
        'score': score,
        'level': level,
        'suggestions': suggestions[:5],
    }
