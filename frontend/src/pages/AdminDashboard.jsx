import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiShieldCheck, HiUserGroup, HiChartBar, HiChat, HiTrendingUp, HiEye, HiBan } from 'react-icons/hi'
import API from '../services/api'

export default function AdminDashboard() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    API.get('/admin/users').then(r => setUsers(r.data.users || []))
      .catch(() => setUsers([
        { name: 'Alice Johnson', email: 'alice@example.com', role: 'user', status: 'active', moodScore: 82, journals: 15, created_at: '2026-04-15' },
        { name: 'Bob Smith', email: 'bob@example.com', role: 'user', status: 'active', moodScore: 65, journals: 8, created_at: '2026-04-20' },
        { name: 'Carol Davis', email: 'carol@example.com', role: 'user', status: 'inactive', moodScore: 45, journals: 3, created_at: '2026-05-01' },
        { name: 'David Lee', email: 'david@example.com', role: 'admin', status: 'active', moodScore: 78, journals: 22, created_at: '2026-03-10' },
        { name: 'Eva Martinez', email: 'eva@example.com', role: 'user', status: 'active', moodScore: 91, journals: 30, created_at: '2026-04-05' },
      ]))
  }, [])

  const platformStats = [
    { label: 'Total Users', value: users.length || 128, icon: HiUserGroup, gradient: 'from-blue-400 to-indigo-600' },
    { label: 'Active Sessions', value: 42, icon: HiChat, gradient: 'from-green-400 to-emerald-600' },
    { label: 'Avg Mood Score', value: '74%', icon: HiTrendingUp, gradient: 'from-purple-400 to-violet-600' },
    { label: 'Total Reports', value: 256, icon: HiChartBar, gradient: 'from-orange-400 to-red-500' },
  ]

  const scoreColor = s => s >= 70 ? 'text-calm-600' : s >= 40 ? 'text-orange-600' : 'text-danger-600'
  const scoreBg = s => s >= 70 ? 'bg-calm-100 dark:bg-calm-950' : s >= 40 ? 'bg-orange-100 dark:bg-orange-950' : 'bg-danger-100 dark:bg-danger-950'

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="page-title flex items-center gap-2"><HiShieldCheck className="w-7 h-7 text-accent-500" /> Admin Dashboard</h1>
        <p className="page-subtitle">Platform management and monitoring</p>
      </motion.div>

      {/* Platform Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {platformStats.map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}
            className="glass-card p-5">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-md mb-3`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <p className="font-display font-bold text-2xl text-surface-900 dark:text-white">{stat.value}</p>
            <p className="text-xs text-surface-500 mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Users Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="glass-card overflow-hidden">
        <div className="p-6 border-b border-surface-200 dark:border-surface-700">
          <h3 className="font-display font-bold text-surface-900 dark:text-white flex items-center gap-2">
            <HiUserGroup className="w-5 h-5 text-primary-500" /> User Management
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800/50">
                {['User', 'Role', 'Status', 'Mood Score', 'Journals', 'Joined', 'Actions'].map(h => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
              {users.map((u, i) => (
                <motion.tr key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 + i * 0.03 }}
                  className="hover:bg-surface-50 dark:hover:bg-surface-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg hero-gradient flex items-center justify-center text-white text-sm font-bold">
                        {u.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-surface-900 dark:text-white">{u.name}</p>
                        <p className="text-xs text-surface-500">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={u.role === 'admin' ? 'badge-accent' : 'badge-primary'}>{u.role}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`badge ${u.status === 'active' ? 'badge-calm' : 'badge-warn'}`}>{u.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 rounded-full bg-surface-200 dark:bg-surface-700 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${u.moodScore}%`, background: u.moodScore >= 70 ? '#10b981' : u.moodScore >= 40 ? '#f97316' : '#ef4444' }} />
                      </div>
                      <span className={`text-sm font-bold ${scoreColor(u.moodScore)}`}>{u.moodScore}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-surface-700 dark:text-surface-300">{u.journals}</td>
                  <td className="px-6 py-4 text-xs text-surface-500">{u.created_at}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-500 hover:text-primary-500 transition-colors">
                        <HiEye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-500 hover:text-danger-500 transition-colors">
                        <HiBan className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
