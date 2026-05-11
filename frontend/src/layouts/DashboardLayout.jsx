/* ══════════════════════════════════════
   DashboardLayout.jsx
   Layout for all authenticated pages.
   Sidebar + Navbar + animated main area.
   ══════════════════════════════════════ */
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import Navbar from '../components/common/Navbar'
import Sidebar from '../components/common/Sidebar'

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.2 } },
}

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950">
      {/* Top Navbar */}
      <Navbar
        onMenuClick={() => setSidebarOpen(p => !p)}
        sidebarOpen={sidebarOpen}
      />

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content area — offset left on desktop for sidebar */}
      <main className="lg:ml-64 pt-16 min-h-screen">
        <motion.div
          key={window.location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="p-4 sm:p-6 lg:p-8"
        >
          {children}
        </motion.div>
      </main>

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'font-sans text-sm',
          style: { borderRadius: '12px', padding: '12px 16px' },
          success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
          error:   { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
        }}
      />
    </div>
  )
}
