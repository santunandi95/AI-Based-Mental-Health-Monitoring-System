/* ══════════════════════════════════════
   App.jsx — Main application router
   Two route groups:
     1. Public (PublicLayout): Landing, About, Login, Register
     2. Protected (DashboardLayout): Dashboard, Mood, etc.
   ══════════════════════════════════════ */
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/common/ProtectedRoute'

// Layouts
import PublicLayout from './layouts/PublicLayout'
import DashboardLayout from './layouts/DashboardLayout'

// Public Pages
import LandingPage from './pages/LandingPage'
import AboutPage from './pages/AboutPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

// Protected Pages
import DashboardPage from './pages/DashboardPage'
import MoodTrackerPage from './pages/MoodTrackerPage'
import ChatbotPage from './pages/ChatbotPage'
import JournalPage from './pages/JournalPage'
import AnalyticsPage from './pages/AnalyticsPage'
import EmergencyPage from './pages/EmergencyPage'
import StressPage from './pages/StressPage'
import ProfilePage from './pages/ProfilePage'
import AdminDashboard from './pages/AdminDashboard'

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* ── Public Routes ── */}
            <Route path="/" element={<PublicLayout><LandingPage /></PublicLayout>} />
            <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
            <Route path="/login" element={<PublicLayout><LoginPage /></PublicLayout>} />
            <Route path="/register" element={<PublicLayout><RegisterPage /></PublicLayout>} />

            {/* ── Protected Routes ── */}
            <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout><DashboardPage /></DashboardLayout></ProtectedRoute>} />
            <Route path="/mood" element={<ProtectedRoute><DashboardLayout><MoodTrackerPage /></DashboardLayout></ProtectedRoute>} />
            <Route path="/chatbot" element={<ProtectedRoute><DashboardLayout><ChatbotPage /></DashboardLayout></ProtectedRoute>} />
            <Route path="/journal" element={<ProtectedRoute><DashboardLayout><JournalPage /></DashboardLayout></ProtectedRoute>} />
            <Route path="/analytics" element={<ProtectedRoute><DashboardLayout><AnalyticsPage /></DashboardLayout></ProtectedRoute>} />
            <Route path="/emergency" element={<ProtectedRoute><DashboardLayout><EmergencyPage /></DashboardLayout></ProtectedRoute>} />
            <Route path="/stress" element={<ProtectedRoute><DashboardLayout><StressPage /></DashboardLayout></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><DashboardLayout><ProfilePage /></DashboardLayout></ProtectedRoute>} />

            {/* ── Admin Routes ── */}
            <Route path="/admin" element={<ProtectedRoute adminOnly><DashboardLayout><AdminDashboard /></DashboardLayout></ProtectedRoute>} />

            {/* ── Catch all → redirect to home ── */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}
