/* ══════════════════════════════════════
   constants.js — App-wide constants
   Mood labels, emotion colours, routes
   ══════════════════════════════════════ */

// Emotions with their emoji, label, color
export const EMOTIONS = [
  { id: 'happy',   emoji: '😊', label: 'Happy',   color: '#10b981', bg: '#ecfdf5' },
  { id: 'calm',    emoji: '😌', label: 'Calm',    color: '#6366f1', bg: '#eef2ff' },
  { id: 'sad',     emoji: '😢', label: 'Sad',     color: '#3b82f6', bg: '#eff6ff' },
  { id: 'angry',   emoji: '😠', label: 'Angry',   color: '#ef4444', bg: '#fef2f2' },
  { id: 'anxious', emoji: '😰', label: 'Anxious', color: '#f97316', bg: '#fff7ed' },
  { id: 'stressed',emoji: '😫', label: 'Stressed',color: '#a855f7', bg: '#faf5ff' },
  { id: 'excited', emoji: '🤩', label: 'Excited', color: '#eab308', bg: '#fefce8' },
  { id: 'neutral', emoji: '😐', label: 'Neutral', color: '#6b7280', bg: '#f9fafb' },
]

// Mood score → label
export const MOOD_LABELS = {
  1: 'Very Bad', 2: 'Bad', 3: 'Okay', 4: 'Good', 5: 'Great'
}

// Wellness recommendation categories
export const RECOMMENDATION_CATEGORIES = [
  { id: 'music',      icon: '🎵', label: 'Music' },
  { id: 'meditation', icon: '🧘', label: 'Meditation' },
  { id: 'exercise',   icon: '🏃', label: 'Exercise' },
  { id: 'sleep',      icon: '😴', label: 'Sleep Tips' },
  { id: 'breathing',  icon: '💨', label: 'Breathing' },
  { id: 'social',     icon: '👥', label: 'Social' },
]

// Navigation links for sidebar
export const NAV_LINKS = [
  { path: '/dashboard', label: 'Dashboard',  icon: 'HiHome' },
  { path: '/mood',      label: 'Mood Tracker',icon: 'HiEmojiHappy' },
  { path: '/journal',   label: 'Journal',    icon: 'HiPencil' },
  { path: '/chatbot',   label: 'AI Chatbot', icon: 'HiChat' },
  { path: '/stress',    label: 'Stress Check',icon: 'HiLightningBolt' },
  { path: '/analytics', label: 'Analytics',  icon: 'HiChartBar' },
  { path: '/emergency', label: 'Emergency',  icon: 'HiPhone' },
  { path: '/profile',   label: 'Profile',    icon: 'HiUser' },
]
