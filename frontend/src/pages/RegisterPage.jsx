import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiUser, HiMail, HiLockClosed, HiEye, HiEyeOff, HiCheckCircle, HiHeart } from 'react-icons/hi'
import { useAuth } from '../context/AuthContext'
import API from '../services/api'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = e => { setForm(p => ({ ...p, [e.target.name]: e.target.value })); setError('') }

  const pwStrength = (() => {
    const p = form.password; if (!p) return 0
    let s = 0; if (p.length >= 6) s++; if (p.length >= 8) s++; if (/[A-Z]/.test(p)) s++; if (/[0-9]/.test(p)) s++; if (/[^A-Za-z0-9]/.test(p)) s++
    return s
  })()
  const pwColors = ['bg-red-500','bg-red-500','bg-orange-500','bg-yellow-500','bg-green-500','bg-emerald-500']
  const pwLabels = ['','Very Weak','Weak','Fair','Strong','Very Strong']

  const validate = () => {
    if (!form.name || !form.email || !form.password || !form.confirmPassword) return 'All fields are required.'
    if (form.password.length < 6) return 'Password must be at least 6 characters.'
    if (form.password !== form.confirmPassword) return 'Passwords do not match.'
    return null
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const err = validate(); if (err) { setError(err); return }
    setLoading(true)
    try {
      await API.post('/auth/register', { name: form.name, email: form.email, password: form.password })
      const loginRes = await API.post('/auth/login', { email: form.email, password: form.password })
      login(loginRes.data.user, loginRes.data.token)
      toast.success('Account created! Welcome to MindCare AI!')
      navigate('/dashboard', { replace: true })
    } catch (err) {
      const msg = err.response?.data?.error || 'Registration failed.'
      setError(msg); toast.error(msg)
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex">
      {/* Left — Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl hero-gradient flex items-center justify-center mx-auto mb-4 shadow-glow">
              <HiHeart className="w-7 h-7 text-white" />
            </div>
            <h1 className="font-display font-bold text-3xl text-surface-900 dark:text-white mb-2">Create Account</h1>
            <p className="text-surface-500 dark:text-surface-400">Start your mental wellness journey today</p>
          </div>

          <form onSubmit={handleSubmit} className="glass-card p-8 space-y-4">
            {error && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-danger-50 dark:bg-danger-950/30 border border-danger-200 dark:border-danger-800 text-sm text-danger-600 dark:text-danger-400">
                {error}
              </motion.div>
            )}

            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Full Name</label>
              <div className="relative">
                <HiUser className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
                <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" className="input-field !pl-10" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Email</label>
              <div className="relative">
                <HiMail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className="input-field !pl-10" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Password</label>
              <div className="relative">
                <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
                <input name="password" type={showPw ? 'text' : 'password'} value={form.password} onChange={handleChange}
                  placeholder="Min 6 characters" className="input-field !pl-10 !pr-10" />
                <button type="button" onClick={() => setShowPw(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600">
                  {showPw ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
                </button>
              </div>
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">{[1,2,3,4,5].map(i => (
                    <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= pwStrength ? pwColors[pwStrength] : 'bg-surface-200 dark:bg-surface-700'}`} />
                  ))}</div>
                  <p className="text-xs text-surface-500">{pwLabels[pwStrength]}</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Confirm Password</label>
              <div className="relative">
                <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
                <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange}
                  placeholder="Re-enter password" className="input-field !pl-10" />
                {form.confirmPassword && form.password === form.confirmPassword && (
                  <HiCheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-calm-500" />
                )}
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="btn-primary w-full justify-center !py-3.5 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating...</span> : 'Create Account'}
            </button>

            <p className="text-center text-sm text-surface-500 dark:text-surface-400">
              Already have an account? <Link to="/login" className="font-semibold text-primary-600 dark:text-primary-400 hover:underline">Sign In</Link>
            </p>
          </form>
        </motion.div>
      </div>

      {/* Right — Benefits Panel */}
      <div className="hidden lg:flex flex-1 items-center justify-center hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          className="relative text-white p-12 max-w-md">
          <h2 className="font-display font-bold text-3xl mb-8">Why MindCare AI?</h2>
          {[
            { title: 'AI Mood Analysis', desc: 'Real-time emotion detection and tracking' },
            { title: 'Stress Prediction', desc: 'ML-powered early stress pattern detection' },
            { title: 'Smart Journal', desc: 'AI-analyzed entries with sentiment scoring' },
            { title: 'Personalized Tips', desc: 'Wellness recommendations tailored to you' },
          ].map((b, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.1 }}
              className="flex items-start gap-3 mb-4">
              <HiCheckCircle className="w-6 h-6 text-green-300 flex-shrink-0 mt-0.5" />
              <div><p className="font-semibold">{b.title}</p><p className="text-sm text-white/70">{b.desc}</p></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
