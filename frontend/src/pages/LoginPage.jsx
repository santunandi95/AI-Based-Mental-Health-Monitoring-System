import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiMail, HiLockClosed, HiEye, HiEyeOff, HiHeart, HiSparkles } from 'react-icons/hi'
import { useAuth } from '../context/AuthContext'
import API from '../services/api'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/dashboard'

  const [form, setForm] = useState({ email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = e => { setForm(p => ({ ...p, [e.target.name]: e.target.value })); setError('') }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.email || !form.password) { setError('Please fill in all fields.'); return }
    setLoading(true)
    try {
      const res = await API.post('/auth/login', form)
      login(res.data.user, res.data.token)
      toast.success('Welcome back!')
      navigate(from, { replace: true })
    } catch (err) {
      const msg = err.response?.data?.error || 'Login failed. Please try again.'
      setError(msg)
      toast.error(msg)
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex">
      {/* Left — Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
          className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl hero-gradient flex items-center justify-center mx-auto mb-4 shadow-glow">
              <HiHeart className="w-7 h-7 text-white" />
            </div>
            <h1 className="font-display font-bold text-3xl text-surface-900 dark:text-white mb-2">Welcome Back</h1>
            <p className="text-surface-500 dark:text-surface-400">Sign in to continue your wellness journey</p>
          </div>

          <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
            {error && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-danger-50 dark:bg-danger-950/30 border border-danger-200 dark:border-danger-800 text-sm text-danger-600 dark:text-danger-400">
                {error}
              </motion.div>
            )}

            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Email</label>
              <div className="relative">
                <HiMail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
                <input name="email" type="email" value={form.email} onChange={handleChange}
                  placeholder="you@example.com" className="input-field !pl-10" autoComplete="email" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Password</label>
              <div className="relative">
                <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
                <input name="password" type={showPw ? 'text' : 'password'} value={form.password} onChange={handleChange}
                  placeholder="Enter password" className="input-field !pl-10 !pr-10" autoComplete="current-password" />
                <button type="button" onClick={() => setShowPw(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600">
                  {showPw ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="btn-primary w-full justify-center !py-3.5 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? (
                <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in...</span>
              ) : 'Sign In'}
            </button>

            <p className="text-center text-sm text-surface-500 dark:text-surface-400">
              Don't have an account?{' '}
              <Link to="/register" className="font-semibold text-primary-600 dark:text-primary-400 hover:underline">Create one</Link>
            </p>
          </form>
        </motion.div>
      </div>

      {/* Right — Hero Panel (hidden on mobile) */}
      <div className="hidden lg:flex flex-1 items-center justify-center hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="relative text-center text-white p-12 max-w-md">
          <HiSparkles className="w-16 h-16 mx-auto mb-6 animate-float" />
          <h2 className="font-display font-bold text-3xl mb-4">Your Mind, Your Journey</h2>
          <p className="text-white/80 leading-relaxed">Track moods, analyze emotions, get AI-powered stress predictions, and receive personalized wellness tips — all in one secure platform.</p>
          <div className="mt-8 flex justify-center gap-4">
            {['Mood','Journal','Chatbot','Analytics'].map(f => (
              <span key={f} className="px-3 py-1.5 rounded-lg bg-white/15 backdrop-blur-sm text-xs font-medium">{f}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
