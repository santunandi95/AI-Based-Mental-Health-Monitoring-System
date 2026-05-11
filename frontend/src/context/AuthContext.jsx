/* ══════════════════════════════════════
   AuthContext.jsx
   Global authentication state manager.
   - Stores user + JWT token in localStorage
   - Validates token expiry on page load
   - Provides login/logout/updateUser helpers
   ══════════════════════════════════════ */
import { createContext, useContext, useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import toast from 'react-hot-toast'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null)
  const [token,   setToken]   = useState(null)
  const [loading, setLoading] = useState(true)  // true while we check localStorage

  // On first load — restore from localStorage if token is still valid
  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    const savedUser  = localStorage.getItem('user')

    if (savedToken && savedUser) {
      try {
        const decoded = jwtDecode(savedToken)
        // Check if token has expired (exp is in Unix seconds)
        if (decoded.exp * 1000 > Date.now()) {
          setToken(savedToken)
          setUser(JSON.parse(savedUser))
        } else {
          // Expired — clear storage silently
          _clearStorage()
          toast.error('Your session expired. Please log in again.')
        }
      } catch {
        // Malformed token — clear
        _clearStorage()
      }
    }
    setLoading(false)
  }, [])

  function _clearStorage() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  // Called after successful login
  function login(userData, jwtToken) {
    setUser(userData)
    setToken(jwtToken)
    localStorage.setItem('token', jwtToken)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  // Logout — wipe everything
  function logout() {
    setUser(null)
    setToken(null)
    _clearStorage()
    toast.success('Logged out successfully!')
  }

  // Update user profile without re-login
  function updateUser(updatedUser) {
    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }

  return (
    <AuthContext.Provider value={{
      user, token, loading,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
      login, logout, updateUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
