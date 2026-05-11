/* ══════════════════════════════════════
   ThemeToggle.jsx
   Sun/Moon icon button for dark/light mode
   ══════════════════════════════════════ */
import { motion, AnimatePresence } from 'framer-motion'
import { HiSun, HiMoon } from 'react-icons/hi'
import { useTheme } from '../../context/ThemeContext'

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <motion.button
      id="theme-toggle-btn"
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="relative w-10 h-10 rounded-xl bg-surface-100 dark:bg-surface-800
                 flex items-center justify-center text-surface-600 dark:text-surface-300
                 hover:bg-primary-100 dark:hover:bg-primary-900/40
                 hover:text-primary-600 dark:hover:text-primary-400
                 transition-colors duration-200 focus:outline-none
                 focus:ring-2 focus:ring-primary-400"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0,   opacity: 1 }}
            exit={{    rotate: 90,  opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <HiSun className="w-5 h-5" />
          </motion.span>
        ) : (
          <motion.span key="moon"
            initial={{ rotate: 90,  opacity: 0 }}
            animate={{ rotate: 0,   opacity: 1 }}
            exit={{    rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <HiMoon className="w-5 h-5" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
