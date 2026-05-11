import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiChartBar, HiTrendingUp, HiCalendar, HiDownload } from 'react-icons/hi'
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const weeklyData = [
  { day: 'Mon', mood: 72, stress: 35, anxiety: 28 },
  { day: 'Tue', mood: 68, stress: 45, anxiety: 38 },
  { day: 'Wed', mood: 80, stress: 28, anxiety: 22 },
  { day: 'Thu', mood: 65, stress: 52, anxiety: 45 },
  { day: 'Fri', mood: 85, stress: 20, anxiety: 18 },
  { day: 'Sat', mood: 90, stress: 15, anxiety: 12 },
  { day: 'Sun', mood: 78, stress: 30, anxiety: 25 },
]

const emotionData = [
  { name: 'Happy', value: 35, color: '#10b981' },
  { name: 'Calm', value: 25, color: '#6366f1' },
  { name: 'Anxious', value: 15, color: '#f97316' },
  { name: 'Sad', value: 10, color: '#3b82f6' },
  { name: 'Stressed', value: 10, color: '#a855f7' },
  { name: 'Neutral', value: 5, color: '#6b7280' },
]

const monthlyScores = [
  { week: 'Week 1', score: 65 },{ week: 'Week 2', score: 70 },
  { week: 'Week 3', score: 75 },{ week: 'Week 4', score: 80 },
]

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('week')

  const summaryCards = [
    { label: 'Avg Mood Score', value: '76%', change: '+8%', positive: true, color: 'from-green-400 to-emerald-600' },
    { label: 'Avg Stress Level', value: '32%', change: '-12%', positive: true, color: 'from-orange-400 to-red-500' },
    { label: 'Most Frequent', value: 'Happy', change: '35%', positive: true, color: 'from-blue-400 to-indigo-600' },
    { label: 'Wellness Trend', value: 'Improving', change: '+15%', positive: true, color: 'from-purple-400 to-violet-600' },
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title flex items-center gap-2"><HiChartBar className="w-7 h-7 text-primary-500" /> Analytics & Reports</h1>
          <p className="page-subtitle">Your mental health trends and insights</p>
        </div>
        <div className="flex items-center gap-2">
          {['week','month'].map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all
                ${period === p ? 'bg-primary-500 text-white shadow-md' : 'glass-card text-surface-600 dark:text-surface-400 hover:text-primary-600'}`}>
              {p === 'week' ? 'This Week' : 'This Month'}
            </button>
          ))}
          <button className="btn-secondary !py-2 !px-3"><HiDownload className="w-4 h-4" /></button>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}
            className="glass-card p-5">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-md mb-3`}>
              <HiTrendingUp className="w-5 h-5 text-white" />
            </div>
            <p className="font-display font-bold text-2xl text-surface-900 dark:text-white">{card.value}</p>
            <div className="flex items-center justify-between mt-1">
              <p className="text-xs text-surface-500">{card.label}</p>
              <span className="text-xs font-bold text-calm-600 dark:text-calm-400">{card.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Mood & Stress Trend */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="glass-card p-6">
          <h3 className="font-display font-bold text-surface-900 dark:text-white mb-4">Mood & Stress Trends</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="moodG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} /><stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="stressG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} /><stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.15)" />
              <XAxis dataKey="day" fontSize={12} tick={{ fill: '#94a3b8' }} />
              <YAxis fontSize={12} tick={{ fill: '#94a3b8' }} domain={[0, 100]} />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }} />
              <Legend />
              <Area type="monotone" dataKey="mood" stroke="#6366f1" strokeWidth={2.5} fill="url(#moodG)" name="Mood" />
              <Area type="monotone" dataKey="stress" stroke="#f97316" strokeWidth={2.5} fill="url(#stressG)" name="Stress" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Emotion Distribution */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="glass-card p-6">
          <h3 className="font-display font-bold text-surface-900 dark:text-white mb-4">Emotion Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={emotionData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {emotionData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Monthly Progress */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="glass-card p-6">
          <h3 className="font-display font-bold text-surface-900 dark:text-white mb-4">Monthly Progress</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyScores}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.15)" />
              <XAxis dataKey="week" fontSize={12} tick={{ fill: '#94a3b8' }} />
              <YAxis fontSize={12} tick={{ fill: '#94a3b8' }} domain={[0, 100]} />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none' }} />
              <Bar dataKey="score" fill="#6366f1" radius={[8, 8, 0, 0]} name="Score" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* AI Insights */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="glass-card p-6">
          <h3 className="font-display font-bold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
            <HiTrendingUp className="w-5 h-5 text-primary-500" /> AI Insights
          </h3>
          <div className="space-y-4">
            {[
              { emoji: '📈', title: 'Mood Improving', desc: 'Your mood score has increased 15% over the past week. Keep up the great work!' },
              { emoji: '😌', title: 'Stress Decreasing', desc: 'Stress levels dropped significantly on weekends. Consider incorporating more relaxation into weekdays.' },
              { emoji: '📝', title: 'Journal Consistency', desc: 'You have journaled 5 out of 7 days this week. Regular journaling correlates with better emotional awareness.' },
              { emoji: '💡', title: 'Recommendation', desc: 'Try 10 minutes of morning meditation. Users with similar patterns report 20% mood improvement.' },
            ].map((insight, i) => (
              <div key={i} className="flex gap-3 p-3 rounded-xl bg-surface-50 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700">
                <span className="text-2xl flex-shrink-0">{insight.emoji}</span>
                <div>
                  <p className="font-semibold text-sm text-surface-900 dark:text-white">{insight.title}</p>
                  <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5">{insight.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
