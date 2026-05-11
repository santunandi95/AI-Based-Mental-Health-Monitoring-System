import { motion } from 'framer-motion'
import { HiPhone, HiExclamation, HiHeart, HiShieldCheck, HiChatAlt2, HiGlobe } from 'react-icons/hi'

const fadeUp = (d = 0) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: d } })

export default function EmergencyPage() {
  const helplines = [
    { name: 'National Suicide Prevention', number: '988', desc: 'Free, confidential 24/7 crisis support', available: '24/7', color: 'from-red-500 to-rose-600' },
    { name: 'Crisis Text Line', number: 'Text HOME to 741741', desc: 'Free crisis counseling via text', available: '24/7', color: 'from-blue-500 to-indigo-600' },
    { name: 'NAMI Helpline', number: '1-800-950-NAMI', desc: 'Mental health info & referrals', available: 'Mon-Fri 10am-10pm', color: 'from-green-500 to-emerald-600' },
    { name: 'SAMHSA Helpline', number: '1-800-662-4357', desc: 'Substance abuse & mental health services', available: '24/7', color: 'from-purple-500 to-violet-600' },
    { name: 'iCall (India)', number: '9152987821', desc: 'Psychosocial helpline by TISS', available: 'Mon-Sat 8am-10pm', color: 'from-orange-500 to-amber-600' },
    { name: 'Vandrevala Foundation', number: '1860-2662-345', desc: 'India mental health helpline', available: '24/7', color: 'from-teal-500 to-cyan-600' },
  ]

  const copingSteps = [
    { num: '1', title: 'Breathe Deeply', desc: 'Take 5 slow, deep breaths. In for 4 seconds, hold for 4, out for 6.' },
    { num: '2', title: 'Ground Yourself', desc: 'Name 5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste.' },
    { num: '3', title: 'Reach Out', desc: 'Call a trusted friend, family member, or any helpline listed below.' },
    { num: '4', title: 'Move Your Body', desc: 'Walk, stretch, or do light exercise to release tension.' },
    { num: '5', title: 'Write It Down', desc: 'Journal your thoughts. Getting them on paper can help process emotions.' },
  ]

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* SOS Banner */}
      <motion.div {...fadeUp()}
        className="relative rounded-2xl overflow-hidden p-6 md:p-8 text-white"
        style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626, #b91c1c)' }}>
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="relative flex flex-col md:flex-row items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
            <HiExclamation className="w-10 h-10" />
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="font-display font-bold text-2xl md:text-3xl mb-1">Emergency Support</h1>
            <p className="text-white/80">If you or someone you know is in immediate danger, please call emergency services (911) right away.</p>
          </div>
          <a href="tel:911"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-red-600 font-bold shadow-xl
                       hover:bg-red-50 active:scale-95 transition-all flex-shrink-0">
            <HiPhone className="w-5 h-5" /> Call 911
          </a>
        </div>
      </motion.div>

      {/* Important Notice */}
      <motion.div {...fadeUp(0.05)}
        className="glass-card p-5 border-l-4 border-orange-500 flex items-start gap-3">
        <HiShieldCheck className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-surface-900 dark:text-white text-sm">You Are Not Alone</p>
          <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5">
            Whatever you're going through, help is available. Reaching out is a sign of strength, not weakness.
            Professional support can make a real difference.
          </p>
        </div>
      </motion.div>

      {/* Coping Steps */}
      <motion.div {...fadeUp(0.1)} className="glass-card p-6">
        <h2 className="font-display font-bold text-xl text-surface-900 dark:text-white mb-4 flex items-center gap-2">
          <HiHeart className="w-5 h-5 text-primary-500" /> Immediate Coping Steps
        </h2>
        <div className="grid sm:grid-cols-5 gap-4">
          {copingSteps.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05 }}
              className="text-center p-3 rounded-xl bg-surface-50 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700">
              <div className="w-10 h-10 rounded-full hero-gradient flex items-center justify-center mx-auto mb-2 text-white font-bold text-sm">
                {step.num}
              </div>
              <h4 className="font-semibold text-sm text-surface-900 dark:text-white mb-1">{step.title}</h4>
              <p className="text-xs text-surface-500 dark:text-surface-400">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Helplines Grid */}
      <div>
        <motion.h2 {...fadeUp(0.15)}
          className="font-display font-bold text-xl text-surface-900 dark:text-white mb-4 flex items-center gap-2">
          <HiPhone className="w-5 h-5 text-primary-500" /> Crisis Helplines
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {helplines.map((h, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.05 }}
              className="glass-card p-5 group hover:shadow-glass-lg">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${h.color} flex items-center justify-center shadow-md mb-3
                              group-hover:scale-110 transition-transform`}>
                <HiPhone className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display font-bold text-surface-900 dark:text-white mb-0.5">{h.name}</h3>
              <p className="text-primary-600 dark:text-primary-400 font-mono font-bold text-lg mb-1">{h.number}</p>
              <p className="text-xs text-surface-500 dark:text-surface-400 mb-2">{h.desc}</p>
              <span className="badge-calm text-xs">{h.available}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Resources */}
      <motion.div {...fadeUp(0.3)} className="glass-card p-6">
        <h2 className="font-display font-bold text-xl text-surface-900 dark:text-white mb-4 flex items-center gap-2">
          <HiGlobe className="w-5 h-5 text-primary-500" /> Additional Resources
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { title: 'MentalHealth.gov', desc: 'US government mental health resources', url: '#' },
            { title: 'WHO Mental Health', desc: 'World Health Organization resources', url: '#' },
            { title: 'NIMHANS (India)', desc: 'National institute for mental health', url: '#' },
            { title: 'BetterHelp', desc: 'Online counseling and therapy platform', url: '#' },
          ].map((r, i) => (
            <a key={i} href={r.url}
              className="flex items-center gap-3 p-3 rounded-xl bg-surface-50 dark:bg-surface-800/50
                         border border-surface-200 dark:border-surface-700
                         hover:border-primary-400 dark:hover:border-primary-600 transition-colors">
              <HiChatAlt2 className="w-5 h-5 text-primary-500 flex-shrink-0" />
              <div><p className="text-sm font-semibold text-surface-900 dark:text-white">{r.title}</p>
              <p className="text-xs text-surface-500">{r.desc}</p></div>
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
