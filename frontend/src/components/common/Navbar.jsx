/* ══════════════════════════════════════
   Navbar.jsx
   Top navigation bar — public + auth aware.
   Shows logo, theme toggle, and either
   Login/Register (public) or user avatar
   + notification bell (authenticated).
   ══════════════════════════════════════ */
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiBell, HiMenuAlt3, HiX, HiLogout, HiUser,
  HiChartBar, HiHeart
} from 'react-icons/hi'
import { useAuth } from '../../context/AuthContext'
import ThemeToggle from './ThemeToggle'

export default function Navbar({ onMenuClick, sidebarOpen }) {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate  = useNavigate()
  const [profileOpen, setProfileOpen] = useState(false)
  const [notifOpen,   setNotifOpen]   = useState(false)

  // Mock notifications — will be replaced with real API in production
  const notifications = [
    { id: 1, text: 'Daily mood check-in reminder 🌟', time: '5 min ago', unread: true },
    { id: 2, text: 'Your stress level improved by 12%', time: '1 hr ago', unread: true },
    { id: 3, text: 'New wellness tip available', time: '3 hrs ago', unread: false },
  ]
  const unreadCount = notifications.filter(n => n.unread).length

  function handleLogout() {
    setProfileOpen(false)
    logout()
    navigate('/')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16
                    bg-white/80 dark:bg-surface-900/80 backdrop-blur-xl
                    border-b border-surface-200 dark:border-surface-800
                    shadow-sm">
      <div className="flex items-center justify-between h-full px-4 sm:px-6">

        {/* ── Left: Hamburger (auth) + Logo ── */}
        <div className="flex items-center gap-3">
          {isAuthenticated && (
            <motion.button
              id="sidebar-toggle-btn"
              whileTap={{ scale: 0.9 }}
              onClick={onMenuClick}
              className="p-2 rounded-xl text-surface-600 dark:text-surface-400
                         hover:bg-surface-100 dark:hover:bg-surface-800
                         transition-colors lg:hidden"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <HiX className="w-6 h-6" /> : <HiMenuAlt3 className="w-6 h-6" />}
            </motion.button>
          )}

          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl hero-gradient flex items-center justify-center shadow-lg
                            group-hover:shadow-glow transition-all duration-300">
              <HiHeart className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-lg text-surface-900 dark:text-white
                             hidden sm:block">
              Mind<span className="gradient-text">Care</span>
              <span className="text-primary-500 font-black"> AI</span>
            </span>
          </Link>
        </div>

        {/* ── Right: Actions ── */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {isAuthenticated ? (
            <>
              {/* Notifications */}
              <div className="relative">
                <motion.button
                  id="notifications-btn"
                  whileTap={{ scale: 0.9 }}
                  onClick={() => { setNotifOpen(p => !p); setProfileOpen(false) }}
                  className="relative p-2 rounded-xl text-surface-600 dark:text-surface-400
                             hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                  aria-label="Notifications"
                >
                  <HiBell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-accent-500 text-white
                                     text-[9px] font-bold rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </motion.button>

                <AnimatePresence>
                  {notifOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0,  scale: 1 }}
                      exit={{   opacity: 0, y: -8, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-80 glass-card border border-surface-200
                                 dark:border-surface-700 shadow-glass-lg overflow-hidden z-50"
                    >
                      <div className="p-4 border-b border-surface-200 dark:border-surface-700">
                        <h3 className="font-semibold text-surface-900 dark:text-white text-sm">
                          Notifications
                        </h3>
                      </div>
                      <div className="divide-y divide-surface-100 dark:divide-surface-800 max-h-72 overflow-y-auto">
                        {notifications.map(n => (
                          <div key={n.id} className={`p-4 hover:bg-surface-50 dark:hover:bg-surface-800
                            transition-colors ${n.unread ? 'bg-primary-50/50 dark:bg-primary-950/30' : ''}`}>
                            <p className="text-sm text-surface-800 dark:text-surface-200">{n.text}</p>
                            <p className="text-xs text-surface-400 mt-1">{n.time}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Profile Dropdown */}
              <div className="relative">
                <motion.button
                  id="profile-menu-btn"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { setProfileOpen(p => !p); setNotifOpen(false) }}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl
                             hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg hero-gradient flex items-center
                                  justify-center text-white font-bold text-sm shadow-md">
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className="text-sm font-medium text-surface-700 dark:text-surface-300
                                   hidden sm:block max-w-[80px] truncate">
                    {user?.name?.split(' ')[0] || 'User'}
                  </span>
                </motion.button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0,  scale: 1 }}
                      exit={{   opacity: 0, y: -8, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-52 glass-card border border-surface-200
                                 dark:border-surface-700 shadow-glass-lg overflow-hidden z-50"
                    >
                      <div className="p-3 border-b border-surface-200 dark:border-surface-700">
                        <p className="font-semibold text-sm text-surface-900 dark:text-white truncate">
                          {user?.name}
                        </p>
                        <p className="text-xs text-surface-400 truncate">{user?.email}</p>
                      </div>
                      <div className="p-2">
                        <Link to="/profile" onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg
                                     text-surface-700 dark:text-surface-300
                                     hover:bg-primary-50 dark:hover:bg-primary-950/40
                                     hover:text-primary-600 transition-colors">
                          <HiUser className="w-4 h-4" /> My Profile
                        </Link>
                        <Link to="/analytics" onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg
                                     text-surface-700 dark:text-surface-300
                                     hover:bg-primary-50 dark:hover:bg-primary-950/40
                                     hover:text-primary-600 transition-colors">
                          <HiChartBar className="w-4 h-4" /> My Reports
                        </Link>
                        <button onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg
                                     text-danger-600 hover:bg-danger-50 dark:hover:bg-danger-950/30
                                     transition-colors mt-1">
                          <HiLogout className="w-4 h-4" /> Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            /* Public nav buttons */
            <div className="flex items-center gap-2">
              <Link to="/login"
                className="px-4 py-2 text-sm font-medium text-surface-700 dark:text-surface-300
                           hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Login
              </Link>
              <Link to="/register" className="btn-primary !py-2 !px-4 text-sm">
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Close dropdowns on backdrop click */}
      {(profileOpen || notifOpen) && (
        <div className="fixed inset-0 z-40" onClick={() => { setProfileOpen(false); setNotifOpen(false) }} />
      )}
    </nav>
  )
}
