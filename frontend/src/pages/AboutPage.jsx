import { motion } from 'framer-motion'
import { HiHeart, HiShieldCheck, HiLightningBolt, HiUserGroup, HiSparkles, HiAcademicCap } from 'react-icons/hi'

const fadeUp = (d = 0) => ({ initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6, delay: d } })

export default function AboutPage() {
  const values = [
    { icon: HiHeart, title: 'Empathy First', desc: 'Technology that understands and supports wellness with compassion.', color: 'from-pink-400 to-rose-600' },
    { icon: HiShieldCheck, title: 'Privacy & Security', desc: 'Your data is encrypted, secured, and never shared.', color: 'from-green-400 to-emerald-600' },
    { icon: HiLightningBolt, title: 'AI Innovation', desc: 'ML models for accurate emotion detection and stress prediction.', color: 'from-orange-400 to-amber-600' },
    { icon: HiUserGroup, title: 'Accessibility', desc: 'Responsive, intuitive, available 24/7 at no cost.', color: 'from-blue-400 to-indigo-600' },
  ]

  const techs = ['React.js','Tailwind CSS','Framer Motion','Python Flask','MongoDB','JWT Auth','TextBlob NLP','Scikit-learn','Gemini AI','Recharts','Docker','REST API']

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <motion.div {...fadeUp()} className="text-center mb-20">
        <span className="badge-primary mb-4 inline-block">About MindCare AI</span>
        <h1 className="font-display font-black text-4xl md:text-5xl text-surface-900 dark:text-white mb-6">
          Building a <span className="gradient-text">Healthier Mind</span> Through Technology
        </h1>
        <p className="text-lg text-surface-500 dark:text-surface-400 max-w-2xl mx-auto leading-relaxed">
          MindCare AI uses artificial intelligence to help users understand emotional patterns, predict stress, and improve wellness.
        </p>
      </motion.div>

      <motion.div {...fadeUp(0.1)} className="glass-card p-8 md:p-12 mb-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5" />
        <div className="relative">
          <h2 className="font-display font-bold text-2xl text-surface-900 dark:text-white mb-4">Our Mission</h2>
          <p className="text-surface-600 dark:text-surface-300 max-w-3xl mx-auto leading-relaxed text-lg">
            To make mental health monitoring accessible, intelligent, and stigma-free for everyone.
          </p>
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {values.map((v, i) => (
          <motion.div key={i} {...fadeUp(i * 0.1)} className="glass-card p-6 text-center group">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${v.color} mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <v.icon className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-display font-bold text-surface-900 dark:text-white mb-2">{v.title}</h3>
            <p className="text-sm text-surface-500 dark:text-surface-400">{v.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div {...fadeUp()} className="glass-card p-8 text-center">
        <h2 className="font-display font-bold text-2xl text-surface-900 dark:text-white mb-6">Technology Stack</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {techs.map(t => (
            <span key={t} className="px-4 py-2 rounded-xl bg-surface-100 dark:bg-surface-800 text-sm font-medium text-surface-700 dark:text-surface-300 border border-surface-200 dark:border-surface-700 hover:border-primary-400 hover:text-primary-600 dark:hover:border-primary-600 dark:hover:text-primary-400 transition-colors">
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
