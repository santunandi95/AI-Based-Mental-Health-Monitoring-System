/* ══════════════════════════════════════
   LoadingSpinner.jsx
   Reusable animated gradient spinner.
   ══════════════════════════════════════ */
import { motion } from 'framer-motion'

export default function LoadingSpinner({ fullScreen = false, size = 'md', message = '' }) {
  const sizes = { sm: 'w-6 h-6', md: 'w-10 h-10', lg: 'w-16 h-16' }

  const spinner = (
    <div className="flex flex-col items-center gap-4">
      {/* Outer spinning ring */}
      <motion.div
        className={`${sizes[size]} rounded-full border-4 border-surface-200 dark:border-surface-700`}
        style={{ borderTopColor: '#6366f1', borderRightColor: '#d946ef' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, ease: 'linear', repeat: Infinity }}
      />
      {message && (
        <p className="text-sm text-surface-500 dark:text-surface-400 animate-pulse-slow">
          {message}
        </p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-surface-50 dark:bg-surface-950 z-50">
        {spinner}
      </div>
    )
  }

  return <div className="flex items-center justify-center p-8">{spinner}</div>
}
