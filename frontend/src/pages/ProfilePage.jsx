import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiUser, HiMail, HiSave, HiShieldCheck, HiCalendar, HiHeart } from 'react-icons/hi'
import { useAuth } from '../context/AuthContext'
import API from '../services/api'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const { user, updateUser } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', age: '', bio: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) setForm({ name: user.name || '', email: user.email || '', age: user.age || '', bio: user.bio || '' })
  }, [user])

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSave = async () => {
    setLoading(true)
    try {
      const res = await API.put('/auth/profile', form)
      updateUser(res.data.user || { ...user, ...form })
      toast.success('Profile updated!')
    } catch {
      updateUser({ ...user, ...form })
      toast.success('Profile updated locally!')
    } finally { setLoading(false) }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="page-title flex items-center gap-2"><HiUser className="w-7 h-7 text-primary-500" /> My Profile</h1>
        <p className="page-subtitle">Manage your account settings</p>
      </motion.div>

      {/* Profile Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="glass-card p-6 flex flex-col sm:flex-row items-center gap-6">
        <div className="w-24 h-24 rounded-2xl hero-gradient flex items-center justify-center text-white text-4xl font-bold shadow-glow flex-shrink-0">
          {user?.name?.[0]?.toUpperCase() || 'U'}
        </div>
        <div className="text-center sm:text-left flex-1">
          <h2 className="font-display font-bold text-xl text-surface-900 dark:text-white">{user?.name || 'User'}</h2>
          <p className="text-sm text-surface-500 dark:text-surface-400">{user?.email}</p>
          <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
            <span className="badge-primary"><HiShieldCheck className="w-3 h-3" /> {user?.role === 'admin' ? 'Admin' : 'Member'}</span>
            <span className="badge-calm"><HiCalendar className="w-3 h-3" /> Joined {new Date(user?.created_at || Date.now()).toLocaleDateString()}</span>
            <span className="badge-accent"><HiHeart className="w-3 h-3" /> Active</span>
          </div>
        </div>
      </motion.div>

      {/* Edit Form */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="glass-card p-6 space-y-5">
        <h3 className="font-display font-bold text-surface-900 dark:text-white">Edit Profile</h3>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Full Name</label>
            <div className="relative">
              <HiUser className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
              <input name="name" value={form.name} onChange={handleChange} className="input-field !pl-10" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Email</label>
            <div className="relative">
              <HiMail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
              <input name="email" type="email" value={form.email} onChange={handleChange} className="input-field !pl-10" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Age</label>
          <input name="age" type="number" value={form.age} onChange={handleChange} placeholder="Enter your age" className="input-field max-w-[200px]" />
        </div>

        <div>
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Bio</label>
          <textarea name="bio" value={form.bio} onChange={handleChange} rows={3}
            placeholder="Tell us a bit about yourself..." className="input-field resize-none" />
        </div>

        <button onClick={handleSave} disabled={loading} className="btn-primary disabled:opacity-60">
          {loading ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</span>
            : <><HiSave className="w-4 h-4" /> Save Changes</>}
        </button>
      </motion.div>

      {/* Account Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Moods Logged', value: '47', color: 'from-green-400 to-emerald-600' },
          { label: 'Journal Entries', value: '23', color: 'from-purple-400 to-violet-600' },
          { label: 'Chat Sessions', value: '15', color: 'from-blue-400 to-indigo-600' },
          { label: 'Day Streak', value: '5', color: 'from-orange-400 to-red-500' },
        ].map((s, i) => (
          <div key={i} className="glass-card p-4 text-center">
            <p className={`font-display font-bold text-2xl bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}>{s.value}</p>
            <p className="text-xs text-surface-500 mt-1">{s.label}</p>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
