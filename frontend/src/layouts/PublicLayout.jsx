/* ══════════════════════════════════════
   PublicLayout.jsx
   Layout for unauthenticated pages.
   Shows only Navbar, no sidebar.
   ══════════════════════════════════════ */
import { Toaster } from 'react-hot-toast'
import Navbar from '../components/common/Navbar'

export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        {children}
      </main>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { borderRadius: '12px', padding: '12px 16px' },
        }}
      />
    </div>
  )
}
