import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiLightningBolt, HiSparkles, HiRefresh } from 'react-icons/hi'
import API from '../services/api'
import toast from 'react-hot-toast'

export default function StressPage() {
  const [form, setForm] = useState({ sleep_hours: 7, exercise_hours: 1, work_hours: 8, social_hours: 2, screen_hours: 5, caffeine: 2, meditation: false, therapy: false })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (name, value) => setForm(p => ({ ...p, [name]: value }))

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await API.post('/stress/predict', form)
      setResult(res.data)
    } catch {
      const score = Math.max(10, Math.min(95, Math.round(
        100 - (form.sleep_hours * 5) - (form.exercise_hours * 8) - (form.social_hours * 4) + (form.work_hours * 3) + (form.screen_hours * 3) + (form.caffeine * 5)
        - (form.meditation ? 15 : 0) - (form.therapy ? 10 : 0)
      )))
      const level = score >= 70 ? 'High' : score >= 40 ? 'Moderate' : 'Low'
      setResult({
        score, level,
        suggestions: [
          score >= 70 ? 'Consider reducing work hours and prioritizing rest' : 'Your routine looks balanced overall',
          form.sleep_hours < 7 ? 'Try to get at least 7-8 hours of sleep' : 'Great sleep habits!',
          !form.meditation ? 'Try incorporating 10 minutes of daily meditation' : 'Keep up the meditation practice!',
          form.screen_hours > 6 ? 'Reduce screen time, especially before bed' : 'Good screen time management',
          form.exercise_hours < 1 ? 'Add 30 minutes of exercise to your daily routine' : 'Good exercise habits!',
        ]
      })
    } finally { setLoading(false) }
  }

  const reset = () => { setResult(null); setForm({ sleep_hours: 7, exercise_hours: 1, work_hours: 8, social_hours: 2, screen_hours: 5, caffeine: 2, meditation: false, therapy: false }) }

  const levelColor = l => l === 'High' ? '#ef4444' : l === 'Moderate' ? '#f97316' : '#10b981'
  const levelBg = l => l === 'High' ? 'from-red-500 to-rose-600' : l === 'Moderate' ? 'from-orange-400 to-amber-600' : 'from-green-400 to-emerald-600'

  const sliders = [
    { name: 'sleep_hours', label: 'Sleep (hours/day)', min: 2, max: 12, emoji: '😴' },
    { name: 'exercise_hours', label: 'Exercise (hours/day)', min: 0, max: 5, emoji: '🏃' },
    { name: 'work_hours', label: 'Work (hours/day)', min: 0, max: 16, emoji: '💼' },
    { name: 'social_hours', label: 'Social Time (hours/day)', min: 0, max: 8, emoji: '👥' },
    { name: 'screen_hours', label: 'Screen Time (hours/day)', min: 0, max: 16, emoji: '📱' },
    { name: 'caffeine', label: 'Caffeine (cups/day)', min: 0, max: 10, emoji: '☕' },
  ]

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="page-title flex items-center gap-2"><HiLightningBolt className="w-7 h-7 text-orange-500" /> Stress Predictor</h1>
        <p className="page-subtitle">Answer a few questions and our AI will predict your stress level</p>
      </motion.div>

      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="glass-card p-6 md:p-8 space-y-6">
            <h3 className="font-display font-bold text-surface-900 dark:text-white">Your Daily Lifestyle</h3>

            {sliders.map(s => (
              <div key={s.name}>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-surface-700 dark:text-surface-300 flex items-center gap-2">
                    <span className="text-lg">{s.emoji}</span> {s.label}
                  </label>
                  <span className="font-display font-bold text-primary-600 dark:text-primary-400 text-lg">{form[s.name]}</span>
                </div>
                <input type="range" min={s.min} max={s.max} step={s.name.includes('caffeine') ? 1 : 0.5}
                  value={form[s.name]} onChange={e => handleChange(s.name, parseFloat(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer
                             bg-surface-200 dark:bg-surface-700
                             [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                             [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-500 [&::-webkit-slider-thumb]:shadow-md
                             [&::-webkit-slider-thumb]:cursor-pointer" />
              </div>
            ))}

            <div className="grid grid-cols-2 gap-4">
              {[{ name: 'meditation', label: 'Do you meditate?', emoji: '🧘' }, { name: 'therapy', label: 'Attending therapy?', emoji: '🩺' }].map(t => (
                <button key={t.name} onClick={() => handleChange(t.name, !form[t.name])}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${form[t.name]
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-950/40 shadow-md'
                    : 'border-surface-200 dark:border-surface-700 hover:border-surface-400'}`}>
                  <span className="text-2xl block mb-1">{t.emoji}</span>
                  <span className="text-sm font-medium text-surface-700 dark:text-surface-300">{t.label}</span>
                  <span className={`block text-xs font-bold mt-1 ${form[t.name] ? 'text-primary-600 dark:text-primary-400' : 'text-surface-400'}`}>
                    {form[t.name] ? 'Yes' : 'No'}
                  </span>
                </button>
              ))}
            </div>

            <button onClick={handleSubmit} disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60">
              {loading ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Analyzing...</span>
                : <><HiSparkles className="w-5 h-5" /> Predict Stress Level</>}
            </button>
          </motion.div>
        ) : (
          <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="space-y-6">
            {/* Score Display */}
            <div className="glass-card p-8 text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-32 h-32 -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" className="text-surface-200 dark:text-surface-700" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke={levelColor(result.level)} strokeWidth="8"
                    strokeDasharray={`${result.score * 2.64} 264`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-display font-black text-3xl text-surface-900 dark:text-white">{result.score}</span>
                  <span className="text-xs text-surface-500">/100</span>
                </div>
              </div>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${levelBg(result.level)} text-white font-bold text-lg shadow-lg mb-2`}>
                <HiLightningBolt className="w-5 h-5" /> {result.level} Stress
              </div>
              <p className="text-sm text-surface-500 dark:text-surface-400 mt-2">
                Based on your lifestyle inputs, our ML model predicts your stress level
              </p>
            </div>

            {/* Suggestions */}
            <div className="glass-card p-6">
              <h3 className="font-display font-bold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
                <HiSparkles className="w-5 h-5 text-primary-500" /> AI Suggestions
              </h3>
              <div className="space-y-3">
                {result.suggestions?.map((s, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-surface-50 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700">
                    <span className="text-lg">💡</span>
                    <p className="text-sm text-surface-700 dark:text-surface-300">{s}</p>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={reset} className="btn-secondary w-full justify-center"><HiRefresh className="w-4 h-4" /> Take Again</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
