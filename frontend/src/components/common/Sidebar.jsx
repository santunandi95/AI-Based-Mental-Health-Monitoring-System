/* ══════════════════════════════════════
   Sidebar.jsx
   Left-side navigation for auth pages.
   - Fixed on desktop (lg+)
   - Slide-in drawer on mobile with overlay
   - Active route highlighting
   - Admin section
   ══════════════════════════════════════ */
import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiHome, HiEmojiHappy, HiPencilAlt, HiChat,
  HiLightningBolt, HiChartBar, HiPhone, HiUser,
  HiCog, HiLogout, HiHeart, HiShieldCheck, HiSparkles
} from 'react-icons/hi'
import { useAuth } from '../../context/AuthContext'

const navLinks = [
  { to: '/dashboard', icon: HiHome,          label: 'Dashboard'   },
  { to: '/mood',      icon: HiEmojiHappy,    label: 'Mood Tracker'},
  { to: '/journal',   icon: HiPencilAlt,     label: 'Journal'     },
  { to: '/chatbot',   icon: HiChat,          label: 'AI Chatbot'  },
  { to: '/stress',    icon: HiLightningBolt, label: 'Stress Check'},
  { to: '/analytics', icon: HiChartBar,      label: 'Analytics'   },
  { to: '/emergency', icon: HiPhone,         label: 'Emergency'   },
  { to: '/profile',   icon: HiUser,          label: 'Profile'     },
]

const adminLinks = [
  { to: '/admin',     icon: HiShieldCheck,   label: 'Admin Panel' },
  { to: '/admin/settings', icon: HiCog,     label: 'Settings'    },
]

export default function Sidebar({ isOpen, onClose }) {
  const { isAdmin, logout, user } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  const sidebarContent = (
    <div className="flex flex-col h-full py-4 overflow-y-auto scrollbar-hide">
      {/* Spacer for navbar height */}
      <div className="h-16 flex-shrink-0" />

      {/* User mini-profile */}
      <div className="px-4 mb-6">
        <div className="glass-card p-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl hero-gradient flex items-center
                          justify-center text-white font-bold text-base shadow-md flex-shrink-0">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-surface-900 dark:text-white truncate">
              {user?.name || 'User'}
            </p>
            <p className="text-xs text-surface-400 truncate flex items-center gap-1">
              <HiSparkles className="w-3 h-3 text-primary-400" />
              Mental Wellness
            </p>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="flex-1 px-3 space-y-1">
        {navLinks.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group
               ${isActive
                 ? 'bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 shadow-sm'
                 : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 hover:text-surface-900 dark:hover:text-white'
               }`
            }
          >
            {({ isActive }) => (
              <>
                <span className={`p-1.5 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-100 dark:bg-primary-900/40'
                    : 'group-hover:bg-surface-200 dark:group-hover:bg-surface-700'
                }`}>
                  <Icon className="w-4 h-4" />
                </span>
                {label}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="ml-auto w-1.5 h-5 rounded-full bg-primary-500"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}

        {/* Admin section */}
        {isAdmin && (
          <>
            <div className="pt-4 pb-2 px-4">
              <p className="text-[11px] font-semibold text-surface-400 uppercase tracking-widest">
                Administration
              </p>
            </div>
            {adminLinks.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group
                   ${isActive
                     ? 'bg-accent-50 dark:bg-accent-950/40 text-accent-600 dark:text-accent-400'
                     : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800'
                   }`
                }
              >
                <span className="p-1.5 rounded-lg group-hover:bg-surface-200 dark:group-hover:bg-surface-700 transition-colors">
                  <Icon className="w-4 h-4" />
                </span>
                {label}
              </NavLink>
            ))}
          </>
        )}
      </nav>

      {/* Bottom: MindCare brand + Logout */}
      <div className="px-3 pt-4 border-t border-surface-200 dark:border-surface-800 space-y-1">
        {/* Mental Health Score quick badge */}
        <div className="px-4 py-3 rounded-xl bg-gradient-to-r from-primary-50 to-accent-50
                        dark:from-primary-950/40 dark:to-accent-950/40 mb-2">
          <p className="text-[11px] text-surface-400 dark:text-surface-500 font-medium mb-1">
            Today's Wellness Score
          </p>
          <div className="flex items-center gap-2">
            <HiHeart className="w-4 h-4 text-primary-500" />
            <div className="flex-1 h-2 rounded-full bg-surface-200 dark:bg-surface-700 overflow-hidden">
              <div className="h-full rounded-full w-3/4"
                   style={{ background: 'linear-gradient(90deg, #6366f1, #d946ef)' }} />
            </div>
            <span className="text-xs font-bold text-primary-600 dark:text-primary-400">74%</span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                     text-surface-600 dark:text-surface-400
                     hover:bg-danger-50 dark:hover:bg-danger-950/30
                     hover:text-danger-600 dark:hover:text-danger-400
                     transition-all duration-200 group"
        >
          <span className="p-1.5 rounded-lg group-hover:bg-danger-100 dark:group-hover:bg-danger-900/30 transition-colors">
            <HiLogout className="w-4 h-4" />
          </span>
          Logout
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar — fixed left */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-64
                        bg-white/80 dark:bg-surface-900/80 backdrop-blur-xl
                        border-r border-surface-200 dark:border-surface-800 z-40">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar — slide-in drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="sidebar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            />
            {/* Drawer */}
            <motion.aside
              key="sidebar-drawer"
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 400, damping: 40 }}
              className="fixed left-0 top-0 bottom-0 w-64
                         bg-white dark:bg-surface-900
                         border-r border-surface-200 dark:border-surface-800
                         z-50 lg:hidden shadow-2xl"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
