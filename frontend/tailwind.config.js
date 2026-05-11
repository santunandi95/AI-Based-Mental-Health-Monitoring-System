/** @type {import('tailwindcss').Config} */
export default {
  // Scan all JSX/JS files for class names
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  // Dark mode toggled by adding 'dark' class to <html> element
  darkMode: 'class',

  theme: {
    extend: {
      // Brand color palette — blue-purple mental health gradient
      colors: {
        primary: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',   // Main brand indigo
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        accent: {
          50:  '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',   // Vibrant purple-pink
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
          950: '#4a044e',
        },
        calm: {
          50:  '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',   // Calm teal-green
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        warn: {
          400: '#fb923c',
          500: '#f97316',   // Warm orange for stress indicators
          600: '#ea580c',
        },
        danger: {
          400: '#f87171',
          500: '#ef4444',   // Red for critical/emergency
          600: '#dc2626',
        },
        surface: {
          50:  '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },

      // Custom font families
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },

      // Custom border-radius
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },

      // Glassmorphism shadows
      boxShadow: {
        glass:      '0 8px 32px rgba(99, 102, 241, 0.12)',
        'glass-lg': '0 20px 60px rgba(99, 102, 241, 0.18)',
        'glow':     '0 0 30px rgba(99, 102, 241, 0.35)',
        'glow-accent': '0 0 30px rgba(217, 70, 239, 0.35)',
        'card':     '0 4px 24px rgba(0, 0, 0, 0.08)',
        'card-dark':'0 4px 24px rgba(0, 0, 0, 0.4)',
        'inner-glow': 'inset 0 1px 0 rgba(255,255,255,0.1)',
      },

      // Custom animations
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.6' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'slide-up': {
          '0%':   { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',    opacity: '1' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'spin-slow': {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'bounce-dot': {
          '0%, 80%, 100%': { transform: 'scale(0)' },
          '40%':           { transform: 'scale(1)' },
        },
        'gradient-move': {
          '0%':   { backgroundPosition: '0% 50%' },
          '50%':  { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        'float':         'float 4s ease-in-out infinite',
        'pulse-slow':    'pulse-slow 3s ease-in-out infinite',
        'shimmer':       'shimmer 2s linear infinite',
        'slide-up':      'slide-up 0.4s ease-out',
        'fade-in':       'fade-in 0.3s ease-out',
        'spin-slow':     'spin-slow 8s linear infinite',
        'bounce-dot-1':  'bounce-dot 1.4s ease-in-out 0s infinite',
        'bounce-dot-2':  'bounce-dot 1.4s ease-in-out 0.2s infinite',
        'bounce-dot-3':  'bounce-dot 1.4s ease-in-out 0.4s infinite',
        'gradient-move': 'gradient-move 4s ease infinite',
      },
    },
  },

  plugins: [],
}
