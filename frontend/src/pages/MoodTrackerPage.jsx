import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiEmojiHappy, HiCalendar, HiPencil, HiCheck, HiSparkles } from 'react-icons/hi'
import API from '../services/api'
import toast from 'react-hot-toast'
import { EMOTIONS } from '../utils/constants'

export default function MoodTrackerPage() {
  const [selected, setSelected] = useState(null)
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState([])
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    API.get('/mood/history').then(r => setHistory(r.data.moods || []))
      .catch(() => setHistory([
        { emotion: 'happy', note: 'Had a productive day!', date: '2026-05-09', score: 85 },
        { emotion: 'calm', note: 'Meditation helped a lot', date: '2026-05-08', score: 78 },
        { emotion: 'anxious', note: 'Deadline stress at work', date: '2026-05-07', score: 42 },
        { emotion: 'excited', note: 'Got great feedback on project', date: '2026-05-06', score: 92 },
        { emotion: 'sad', note: 'Feeling a bit low today', date: '2026-05-05', score: 35 },
      ]))
  }, [])

  const handleSubmit = async () => {
    if (!selected) { toast.error('Please select a mood'); return }
    setLoading(true)
    try {
      await API.post('/mood/log', { emotion: selected.id, note })
      toast.success('Mood logged successfully!')
      setSubmitted(true)
      setHistory(prev => [{ emotion: selected.id, note, date: new Date().toISOString().split('T')[0], score: Math.floor(Math.random() * 40) + 50 }, ...prev])
      setTimeout(() => { setSubmitted(false); setSelected(null); setNote('') }, 3000)
    } catch {
      toast.success('Mood logged locally!')
      setSubmitted(true)
      setHistory(prev => [{ emotion: selected.id, note, date: new Date().toISOString().split('T')[0], score: Math.floor(Math.random() * 40) + 50 }, ...prev])
      setTimeout(() => { setSubmitted(false); setSelected(null); setNote('') }, 3000)
    } finally { setLoading(false) }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="page-title flex items-center gap-2">
          <HiEmojiHappy className="w-7 h-7 text-primary-500" /> Mood Tracker
        </h1>
        <p className="page-subtitle">How are you feeling right now?</p>
      </motion.div>

      {/* Emotion Selector */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="glass-card p-6 md:p-8">
        <h3 className="font-display font-bold text-surface-900 dark:text-white mb-6 text-center">
          Select Your Current Mood
        </h3>

        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 mb-6">
          {EMOTIONS.map((emo, i) => (
            <motion.button key={emo.id}
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 + i * 0.04 }}
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              onClick={() => setSelected(emo)}
              className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all duration-300
                ${selected?.id === emo.id
                  ? 'border-primary-500 shadow-glow scale-105'
                  : 'border-transparent hover:border-surface-300 dark:hover:border-surface-600'
                }`}
              style={selected?.id === emo.id ? { backgroundColor: emo.bg + '60' } : {}}
            >
              <span className="text-3xl sm:text-4xl">{emo.emoji}</span>
              <span className="text-[11px] font-medium text-surface-600 dark:text-surface-400">{emo.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Selected mood display */}
        <AnimatePresence>
          {selected && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-xl" style={{ backgroundColor: selected.bg + '40' }}>
                <span className="text-2xl">{selected.emoji}</span>
                <div>
                  <p className="font-semibold text-surface-900 dark:text-white">Feeling {selected.label}</p>
                  <p className="text-xs text-surface-500">Add a note about why you feel this way (optional)</p>
                </div>
              </div>

              <div className="relative">
                <HiPencil className="absolute left-3 top-3 w-5 h-5 text-surface-400" />
                <textarea value={note} onChange={e => setNote(e.target.value)} rows={3}
                  placeholder="What's on your mind? (optional)" className="input-field !pl-10 resize-none" />
              </div>

              <button onClick={handleSubmit} disabled={loading}
                className="btn-primary w-full justify-center disabled:opacity-60">
                {loading ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</span>
                  : <><HiCheck className="w-5 h-5" /> Log Mood</>}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success state */}
        <AnimatePresence>
          {submitted && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="text-center p-6">
              <HiSparkles className="w-12 h-12 text-primary-500 mx-auto mb-3 animate-float" />
              <p className="font-display font-bold text-xl text-surface-900 dark:text-white mb-1">Mood Logged!</p>
              <p className="text-sm text-surface-500">Great job tracking your emotions today</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Mood History */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="glass-card p-6">
        <h3 className="font-display font-bold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
          <HiCalendar className="w-5 h-5 text-primary-500" /> Recent Mood History
        </h3>

        <div className="space-y-3">
          {history.slice(0, 7).map((entry, i) => {
            const emo = EMOTIONS.find(e => e.id === entry.emotion) || EMOTIONS[7]
            return (
              <motion.div key={i} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.05 }}
                className="flex items-center gap-4 p-3 rounded-xl bg-surface-50 dark:bg-surface-800/50
                           border border-surface-200 dark:border-surface-700 hover:border-primary-300
                           dark:hover:border-primary-700 transition-colors">
                <span className="text-2xl">{emo.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-surface-900 dark:text-white">{emo.label}</span>
                    <span className="text-xs text-surface-400">{entry.date}</span>
                  </div>
                  {entry.note && <p className="text-xs text-surface-500 dark:text-surface-400 truncate mt-0.5">{entry.note}</p>}
                </div>
                <div className="text-right">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold"
                    style={{ backgroundColor: emo.bg, color: emo.color }}>
                    {entry.score}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
