/* ══════════════════════════════════════
   ProtectedRoute.jsx
   Guards routes requiring authentication.
   Redirects unauthenticated → /login
   Redirects non-admins from admin routes.
   ══════════════════════════════════════ */
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import LoadingSpinner from './LoadingSpinner'

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { isAuthenticated, isAdmin, loading } = useAuth()
  const location = useLocation()

  // Show spinner while AuthContext is hydrating from localStorage
  if (loading) return <LoadingSpinner fullScreen />

  // Not logged in → redirect to login, remember where they came from
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Admin-only page — redirect regular users to dashboard
  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}
