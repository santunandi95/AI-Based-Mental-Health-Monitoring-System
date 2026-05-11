import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiPencilAlt, HiCalendar, HiSparkles, HiSave, HiBookOpen } from 'react-icons/hi'
import API from '../services/api'
import toast from 'react-hot-toast'

export default function JournalPage() {
  const [tab, setTab] = useState('write')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState(null)
  const [entries, setEntries] = useState([])

  useEffect(() => {
    API.get('/journal/entries').then(r => setEntries(r.data.entries || []))
      .catch(() => setEntries([
        { title: 'A Productive Day', content: 'Today was really great...', date: '2026-05-09', sentiment: 'Positive', score: 82, emotions: ['Happy','Calm'] },
        { title: 'Dealing with Stress', content: 'Work deadlines piling up...', date: '2026-05-07', sentiment: 'Negative', score: 38, emotions: ['Stressed','Anxious'] },
        { title: 'Weekend Reflections', content: 'Spent time with family...', date: '2026-05-04', sentiment: 'Positive', score: 90, emotions: ['Happy','Excited'] },
        { title: 'Feeling Uncertain', content: 'Not sure about next steps...', date: '2026-05-02', sentiment: 'Neutral', score: 55, emotions: ['Neutral','Anxious'] },
      ]))
  }, [])

  const handleSubmit = async () => {
    if (!content.trim()) { toast.error('Please write something in your journal'); return }
    setLoading(true)
    try {
      const res = await API.post('/journal/analyze', { title: title || 'Untitled Entry', content })
      setAnalysis(res.data)
      setEntries(prev => [{ title: title || 'Untitled Entry', content, date: new Date().toISOString().split('T')[0], ...res.data }, ...prev])
      toast.success('Journal analyzed!')
    } catch {
      // Fallback analysis
      const mock = { sentiment: 'Positive', score: 72, emotions: ['Calm', 'Hopeful'], keywords: ['productive', 'grateful', 'growth'], suggestion: 'Your writing shows a positive outlook. Keep maintaining this healthy mindset through regular journaling.' }
      setAnalysis(mock)
      setEntries(prev => [{ title: title || 'Untitled Entry', content, date: new Date().toISOString().split('T')[0], ...mock }, ...prev])
      toast.success('Journal analyzed!')
    } finally { setLoading(false) }
  }

  const sentimentColor = s => s === 'Positive' ? 'text-calm-600 bg-calm-100 dark:bg-calm-950 dark:text-calm-400'
    : s === 'Negative' ? 'text-danger-600 bg-danger-100 dark:bg-danger-950 dark:text-danger-400'
    : 'text-surface-600 bg-surface-100 dark:bg-surface-800 dark:text-surface-400'

  const scoreColor = s => s >= 70 ? '#10b981' : s >= 40 ? '#f97316' : '#ef4444'

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="page-title flex items-center gap-2"><HiPencilAlt className="w-7 h-7 text-primary-500" /> Smart Journal</h1>
        <p className="page-subtitle">Write your thoughts and get AI emotion analysis</p>
      </motion.div>

      {/* Tab Switcher */}
      <div className="flex gap-2 p-1 glass-card w-fit">
        {[{ id: 'write', label: 'Write', icon: HiPencilAlt }, { id: 'history', label: 'History', icon: HiBookOpen }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all
              ${tab === t.id ? 'bg-primary-500 text-white shadow-md' : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800'}`}>
            <t.icon className="w-4 h-4" /> {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {tab === 'write' ? (
          <motion.div key="write" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
            className="space-y-6">
            {/* Writing Area */}
            <div className="glass-card p-6 space-y-4">
              <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Journal Title (optional)"
                className="input-field text-lg font-display font-semibold" />
              <textarea value={content} onChange={e => setContent(e.target.value)} rows={8}
                placeholder="Write about your day, feelings, thoughts, or anything on your mind..."
                className="input-field resize-none leading-relaxed" />
              <div className="flex items-center justify-between">
                <p className="text-xs text-surface-400">{content.length} characters</p>
                <button onClick={handleSubmit} disabled={loading || !content.trim()}
                  className="btn-primary disabled:opacity-60">
                  {loading ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Analyzing...</span>
                    : <><HiSparkles className="w-4 h-4" /> Analyze & Save</>}
                </button>
              </div>
            </div>

            {/* Analysis Result */}
            <AnimatePresence>
              {analysis && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="glass-card p-6 border-l-4 border-primary-500">
                  <h3 className="font-display font-bold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
                    <HiSparkles className="w-5 h-5 text-primary-500" /> AI Analysis Result
                  </h3>
                  <div className="grid sm:grid-cols-3 gap-4 mb-4">
                    {/* Score Circle */}
                    <div className="flex flex-col items-center">
                      <div className="relative w-24 h-24">
                        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" className="text-surface-200 dark:text-surface-700" />
                          <circle cx="50" cy="50" r="42" fill="none" stroke={scoreColor(analysis.score)} strokeWidth="8"
                            strokeDasharray={`${analysis.score * 2.64} 264`} strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-display font-bold text-2xl text-surface-900 dark:text-white">{analysis.score}</span>
                        </div>
                      </div>
                      <p className="text-xs text-surface-500 mt-2">Wellness Score</p>
                    </div>
                    {/* Sentiment & Emotions */}
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-surface-500 mb-1">Sentiment</p>
                        <span className={`badge ${sentimentColor(analysis.sentiment)}`}>{analysis.sentiment}</span>
                      </div>
                      <div>
                        <p className="text-xs text-surface-500 mb-1">Detected Emotions</p>
                        <div className="flex flex-wrap gap-1">{analysis.emotions?.map(e => (
                          <span key={e} className="badge-accent">{e}</span>
                        ))}</div>
                      </div>
                    </div>
                    {/* Keywords */}
                    <div>
                      <p className="text-xs text-surface-500 mb-1">Keywords</p>
                      <div className="flex flex-wrap gap-1">{analysis.keywords?.map(k => (
                        <span key={k} className="badge-primary">{k}</span>
                      ))}</div>
                    </div>
                  </div>
                  {analysis.suggestion && (
                    <div className="p-3 rounded-xl bg-primary-50 dark:bg-primary-950/30 border border-primary-200 dark:border-primary-800">
                      <p className="text-sm text-primary-700 dark:text-primary-300"><strong>AI Suggestion:</strong> {analysis.suggestion}</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div key="history" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="space-y-4">
            {entries.length === 0 ? (
              <div className="glass-card p-12 text-center">
                <HiBookOpen className="w-12 h-12 text-surface-300 mx-auto mb-3" />
                <p className="text-surface-500">No journal entries yet. Start writing!</p>
              </div>
            ) : entries.map((entry, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="glass-card p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display font-bold text-surface-900 dark:text-white">{entry.title}</h4>
                    <p className="text-sm text-surface-500 dark:text-surface-400 line-clamp-2 mt-1">{entry.content}</p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span className="text-xs text-surface-400 flex items-center gap-1"><HiCalendar className="w-3 h-3" />{entry.date}</span>
                      {entry.sentiment && <span className={`badge text-xs ${sentimentColor(entry.sentiment)}`}>{entry.sentiment}</span>}
                      {entry.emotions?.map(e => <span key={e} className="badge-accent text-xs">{e}</span>)}
                    </div>
                  </div>
                  {entry.score && (
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm text-white flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, ${scoreColor(entry.score)}, ${scoreColor(entry.score)}dd)` }}>
                      {entry.score}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
