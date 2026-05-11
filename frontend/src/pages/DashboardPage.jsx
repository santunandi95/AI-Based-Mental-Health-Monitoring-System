import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiHeart, HiEmojiHappy, HiPencilAlt, HiChat, HiChartBar, HiLightningBolt, HiTrendingUp, HiSparkles, HiArrowRight, HiCalendar } from 'react-icons/hi'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useAuth } from '../context/AuthContext'
import API from '../services/api'

const fadeUp = (d = 0) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: d } })

// Mock chart data
const weekData = [
  { day: 'Mon', mood: 72, stress: 35 },{ day: 'Tue', mood: 68, stress: 45 },
  { day: 'Wed', mood: 80, stress: 28 },{ day: 'Thu', mood: 65, stress: 52 },
  { day: 'Fri', mood: 85, stress: 20 },{ day: 'Sat', mood: 90, stress: 15 },
  { day: 'Sun', mood: 78, stress: 30 },
]

export default function DashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const greeting = (() => { const h = new Date().getHours(); return h < 12 ? 'Good Morning' : h < 17 ? 'Good Afternoon' : 'Good Evening' })()

  useEffect(() => {
    // Try to fetch real stats, fallback to defaults
    API.get('/analytics/summary').then(r => setStats(r.data)).catch(() => setStats({
      moodScore: 74, stressLevel: 32, journalCount: 12, chatSessions: 8, streak: 5, improvement: 12
    }))
  }, [])

  const s = stats || { moodScore: 74, stressLevel: 32, journalCount: 12, chatSessions: 8, streak: 5, improvement: 12 }

  const statCards = [
    { label: 'Mood Score', value: `${s.moodScore}%`, icon: HiEmojiHappy, gradient: 'from-green-400 to-emerald-600', change: `+${s.improvement}%` },
    { label: 'Stress Level', value: `${s.stressLevel}%`, icon: HiLightningBolt, gradient: 'from-orange-400 to-red-500', change: '-8%' },
    { label: 'Journal Entries', value: s.journalCount, icon: HiPencilAlt, gradient: 'from-purple-400 to-violet-600', change: '+3' },
    { label: 'Chat Sessions', value: s.chatSessions, icon: HiChat, gradient: 'from-blue-400 to-indigo-600', change: '+2' },
  ]

  const quickActions = [
    { to: '/mood', icon: HiEmojiHappy, label: 'Log Mood', color: 'from-green-400 to-emerald-600' },
    { to: '/journal', icon: HiPencilAlt, label: 'Write Journal', color: 'from-purple-400 to-violet-600' },
    { to: '/chatbot', icon: HiChat, label: 'AI Chatbot', color: 'from-blue-400 to-indigo-600' },
    { to: '/stress', icon: HiLightningBolt, label: 'Stress Check', color: 'from-orange-400 to-red-500' },
    { to: '/analytics', icon: HiChartBar, label: 'View Reports', color: 'from-cyan-400 to-blue-600' },
    { to: '/emergency', icon: HiHeart, label: 'Get Help', color: 'from-pink-400 to-rose-600' },
  ]

  const recommendations = [
    { emoji: '🎵', title: 'Calming Music', desc: 'Listen to lo-fi or nature sounds to reduce stress', category: 'Music' },
    { emoji: '🧘', title: '5-Min Meditation', desc: 'A quick guided meditation for mindfulness', category: 'Meditation' },
    { emoji: '🏃', title: 'Light Exercise', desc: '15 minutes of walking can boost your mood by 30%', category: 'Exercise' },
    { emoji: '😴', title: 'Sleep Hygiene', desc: 'Maintain a consistent sleep schedule tonight', category: 'Sleep' },
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Greeting */}
      <motion.div {...fadeUp()}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="page-title text-3xl">{greeting}, <span className="gradient-text">{user?.name?.split(' ')[0] || 'User'}</span> 👋</h1>
            <p className="page-subtitle mt-1">Here's how you're doing today</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-surface-500 dark:text-surface-400">
            <HiCalendar className="w-4 h-4" />
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </motion.div>

      {/* Streak Badge */}
      <motion.div {...fadeUp(0.05)} className="glass-card p-4 flex items-center gap-3 border-l-4 border-primary-500">
        <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center">
          <HiTrendingUp className="w-5 h-5 text-primary-600 dark:text-primary-400" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-surface-900 dark:text-white">
            {s.streak} Day Streak! 🔥
          </p>
          <p className="text-xs text-surface-500 dark:text-surface-400">
            Keep tracking your mood daily to maintain your streak
          </p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <motion.div key={i} {...fadeUp(0.1 + i * 0.05)} className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-md`}>
                <card.icon className="w-5 h-5 text-white" />
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${card.change.startsWith('+') || card.change.startsWith('-8') ? 'bg-calm-100 text-calm-700 dark:bg-calm-950 dark:text-calm-400' : 'bg-danger-100 text-danger-700'}`}>
                {card.change}
              </span>
            </div>
            <p className="font-display font-bold text-2xl text-surface-900 dark:text-white">{card.value}</p>
            <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5">{card.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Chart + Quick Actions Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Weekly Mood Chart */}
        <motion.div {...fadeUp(0.2)} className="lg:col-span-2 glass-card p-6">
          <h3 className="font-display font-bold text-surface-900 dark:text-white mb-4">Weekly Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={weekData}>
              <defs>
                <linearGradient id="moodGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="stressGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.15)" />
              <XAxis dataKey="day" fontSize={12} tick={{ fill: '#94a3b8' }} />
              <YAxis fontSize={12} tick={{ fill: '#94a3b8' }} domain={[0, 100]} />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }} />
              <Area type="monotone" dataKey="mood" stroke="#6366f1" strokeWidth={2.5} fill="url(#moodGrad)" name="Mood" />
              <Area type="monotone" dataKey="stress" stroke="#f97316" strokeWidth={2.5} fill="url(#stressGrad)" name="Stress" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Quick Actions */}
        <motion.div {...fadeUp(0.25)} className="glass-card p-6">
          <h3 className="font-display font-bold text-surface-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, i) => (
              <Link key={i} to={action.to}
                className="p-3 rounded-xl bg-surface-50 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700
                           hover:border-primary-300 dark:hover:border-primary-700
                           hover:shadow-md transition-all duration-200 text-center group">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mx-auto mb-2 shadow-sm
                                group-hover:scale-110 transition-transform duration-200`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-xs font-medium text-surface-700 dark:text-surface-300">{action.label}</p>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* AI Recommendations */}
      <motion.div {...fadeUp(0.3)}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-surface-900 dark:text-white flex items-center gap-2">
            <HiSparkles className="w-5 h-5 text-primary-500" /> AI Recommendations
          </h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recommendations.map((rec, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 + i * 0.05 }}
              className="glass-card p-5 cursor-pointer group">
              <div className="text-3xl mb-3">{rec.emoji}</div>
              <span className="badge-primary mb-2">{rec.category}</span>
              <h4 className="font-semibold text-surface-900 dark:text-white mt-2 mb-1">{rec.title}</h4>
              <p className="text-xs text-surface-500 dark:text-surface-400 leading-relaxed">{rec.desc}</p>
              <div className="mt-3 flex items-center gap-1 text-xs font-medium text-primary-600 dark:text-primary-400 group-hover:gap-2 transition-all">
                Try Now <HiArrowRight className="w-3 h-3" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
