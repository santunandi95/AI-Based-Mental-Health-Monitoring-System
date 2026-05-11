import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiChat, HiPaperAirplane, HiSparkles, HiUser } from 'react-icons/hi'
import API from '../services/api'

const starters = [
  "I'm feeling anxious today",
  "How can I manage stress better?",
  "I need someone to talk to",
  "Help me with sleep tips",
  "I'm feeling overwhelmed at work",
]

export default function ChatbotPage() {
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hello! I'm MindCare AI, your mental wellness companion. I'm here to listen, support, and help you navigate your emotions. How are you feeling today?", time: new Date() }
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' }) }, [messages, typing])

  const sendMessage = async (text) => {
    const msg = text || input.trim()
    if (!msg) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: msg, time: new Date() }])
    setTyping(true)

    try {
      const res = await API.post('/chatbot/message', { message: msg })
      setMessages(prev => [...prev, { role: 'bot', text: res.data.response, time: new Date(), sentiment: res.data.sentiment }])
    } catch {
      // Fallback responses if backend is not running
      const fallbacks = [
        "I hear you, and your feelings are completely valid. It's okay to feel this way. Would you like to talk more about what's going on?",
        "Thank you for sharing that with me. Remember, taking the time to express your feelings is a sign of strength. What would help you feel better right now?",
        "I understand this can be difficult. Let's try a simple breathing exercise: breathe in for 4 seconds, hold for 4, breathe out for 4. How do you feel after trying that?",
        "It sounds like you're going through a lot. I'm here for you. Have you tried journaling about these feelings? Writing can help process emotions.",
        "Your mental health matters, and reaching out is a brave step. Would you like me to suggest some wellness activities that might help?"
      ]
      const fallback = fallbacks[Math.floor(Math.random() * fallbacks.length)]
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'bot', text: fallback, time: new Date() }])
      }, 1200)
    } finally {
      setTimeout(() => setTyping(false), 1200)
    }
  }

  const handleKeyDown = e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }

  const formatTime = d => new Date(d).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-7rem)] flex flex-col">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-4">
        <div className="w-11 h-11 rounded-xl hero-gradient flex items-center justify-center shadow-glow">
          <HiSparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-display font-bold text-lg text-surface-900 dark:text-white flex items-center gap-2">
            MindCare AI Assistant
            <span className="w-2 h-2 rounded-full bg-calm-500 animate-pulse" />
          </h1>
          <p className="text-xs text-surface-500 dark:text-surface-400">Always here to listen and support you</p>
        </div>
      </motion.div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 glass-card p-4 overflow-y-auto scrollbar-hide space-y-4">
        {messages.map((msg, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'bot' && (
              <div className="w-8 h-8 rounded-lg hero-gradient flex items-center justify-center flex-shrink-0 shadow-sm">
                <HiSparkles className="w-4 h-4 text-white" />
              </div>
            )}
            <div>
              <div className={`chat-bubble ${msg.role}`}>{msg.text}</div>
              <div className={`flex items-center gap-2 mt-1 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                <span className="text-[10px] text-surface-400">{formatTime(msg.time)}</span>
                {msg.sentiment && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400">
                    {msg.sentiment}
                  </span>
                )}
              </div>
            </div>
            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center flex-shrink-0">
                <HiUser className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              </div>
            )}
          </motion.div>
        ))}

        {/* Typing indicator */}
        {typing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2.5">
            <div className="w-8 h-8 rounded-lg hero-gradient flex items-center justify-center flex-shrink-0 shadow-sm">
              <HiSparkles className="w-4 h-4 text-white" />
            </div>
            <div className="chat-bubble bot flex items-center gap-1.5 py-4">
              <span className="w-2 h-2 bg-surface-400 rounded-full animate-bounce-dot-1" />
              <span className="w-2 h-2 bg-surface-400 rounded-full animate-bounce-dot-2" />
              <span className="w-2 h-2 bg-surface-400 rounded-full animate-bounce-dot-3" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Starter Questions */}
      {messages.length <= 1 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-2 mt-3">
          {starters.map((q, i) => (
            <button key={i} onClick={() => sendMessage(q)}
              className="px-3 py-2 rounded-xl text-xs font-medium
                         bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700
                         text-surface-600 dark:text-surface-400
                         hover:border-primary-400 hover:text-primary-600
                         dark:hover:border-primary-600 dark:hover:text-primary-400
                         transition-colors">
              {q}
            </button>
          ))}
        </motion.div>
      )}

      {/* Input Area */}
      <div className="mt-3 flex gap-2">
        <div className="flex-1 relative">
          <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
            placeholder="Type your message..." disabled={typing}
            className="input-field !pr-12 disabled:opacity-60" />
        </div>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={() => sendMessage()} disabled={!input.trim() || typing}
          className="btn-primary !px-4 disabled:opacity-40 disabled:cursor-not-allowed">
          <HiPaperAirplane className="w-5 h-5 rotate-90" />
        </motion.button>
      </div>
    </div>
  )
}
