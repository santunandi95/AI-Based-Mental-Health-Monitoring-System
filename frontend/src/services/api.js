/* ══════════════════════════════════════
   api.js — Axios Base Configuration
   All HTTP calls flow through this file.
   Automatically attaches JWT token and
   handles 401 (expired/invalid token).
   ══════════════════════════════════════ */
import axios from 'axios'

// Base URL from environment variable (Vite uses import.meta.env)
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000, // 15 second timeout
})

// ── Request Interceptor ────────────────────────────────────────
// Attach the JWT token (if present) to every outgoing request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ── Response Interceptor ───────────────────────────────────────
// If the server returns 401, the token is expired/invalid.
// Force-logout by clearing storage and redirecting to login.
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      // Hard redirect to login (works outside React component tree)
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default API
