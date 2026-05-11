/* ══════════════════════════════════════════════════════════════
   LandingPage.jsx — Public home page
   Sections: Hero → Stats → Features → How It Works → CTA → Footer
   ══════════════════════════════════════════════════════════════ */
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  HiHeart, HiEmojiHappy, HiChat, HiLightningBolt,
  HiChartBar, HiShieldCheck, HiSparkles, HiPencilAlt,
  HiPhone, HiClock, HiStar, HiArrowRight, HiUserGroup
} from 'react-icons/hi'

// Animation helpers
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
})

const stagger = { initial: 'initial', whileInView: 'animate', viewport: { once: true } }
const staggerChildren = { animate: { transition: { staggerChildren: 0.1 } } }
const fadeChild = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0, transition: { duration: 0.5 } } }

export default function LandingPage() {
  const features = [
    { icon: HiEmojiHappy,    title: 'Mood Tracking',          desc: 'Track your daily mood with intelligent emotion detection and beautiful visualizations.', color: 'from-green-400 to-emerald-600' },
    { icon: HiChat,          title: 'AI Chatbot',             desc: 'Talk to our AI-powered mental health companion for supportive, judgement-free conversations.', color: 'from-blue-400 to-indigo-600' },
    { icon: HiPencilAlt,     title: 'Smart Journal',          desc: 'Write journal entries and get AI emotion analysis, keyword extraction, and sentiment scores.', color: 'from-purple-400 to-violet-600' },
    { icon: HiLightningBolt, title: 'Stress Prediction',      desc: 'ML-powered stress level prediction based on your lifestyle and behavioral patterns.', color: 'from-orange-400 to-red-500' },
    { icon: HiChartBar,      title: 'Analytics Dashboard',    desc: 'Comprehensive mental health reports with trend charts, emotion breakdowns, and insights.', color: 'from-cyan-400 to-blue-600' },
    { icon: HiShieldCheck,   title: 'Secure & Private',       desc: 'End-to-end encryption, JWT authentication, and strict data privacy — your data stays yours.', color: 'from-pink-400 to-rose-600' },
  ]

  const stats = [
    { value: '50K+',  label: 'Users Supported' },
    { value: '98%',   label: 'Accuracy Rate' },
    { value: '24/7',  label: 'AI Available' },
    { value: '6+',    label: 'Emotion Types' },
  ]

  const steps = [
    { num: '01', title: 'Create Account', desc: 'Sign up securely in under 30 seconds with email verification.' },
    { num: '02', title: 'Track Your Mood', desc: 'Log your daily emotions and thoughts using our intuitive mood tracker.' },
    { num: '03', title: 'Get AI Insights', desc: 'Our ML models analyze patterns and provide personalized wellness suggestions.' },
    { num: '04', title: 'Improve Wellness', desc: 'Follow curated recommendations for music, meditation, exercise, and sleep.' },
  ]

  return (
    <div className="overflow-hidden">
      {/* ── HERO SECTION ──────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center justify-center px-4 py-20">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-400/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-300/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-grid-pattern opacity-40 dark:opacity-20" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div {...fadeUp()} className="inline-flex items-center gap-2 px-4 py-2 mb-8
                       rounded-full border border-primary-200 dark:border-primary-800
                       bg-primary-50/80 dark:bg-primary-950/50 backdrop-blur-sm">
            <HiSparkles className="w-4 h-4 text-primary-500" />
            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
              AI-Powered Mental Wellness Platform
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1 {...fadeUp(0.1)}
            className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl
                       text-surface-900 dark:text-white leading-[1.1] mb-6">
            Your Mental Health
            <br />
            <span className="gradient-text">Matters Most</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p {...fadeUp(0.2)}
            className="text-lg sm:text-xl text-surface-600 dark:text-surface-400
                       max-w-2xl mx-auto mb-10 leading-relaxed">
            Track your mood, analyze emotions with AI, predict stress patterns, and get
            personalized wellness recommendations — all in one beautiful, secure platform.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-primary text-base !px-8 !py-4 shadow-glow">
              <HiHeart className="w-5 h-5" />
              Start Your Journey
              <HiArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/about" className="btn-secondary text-base !px-8 !py-4">
              Learn More
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div {...fadeUp(0.4)} className="flex items-center justify-center gap-6 mt-12 text-surface-400 dark:text-surface-500">
            <div className="flex items-center gap-1.5 text-sm">
              <HiShieldCheck className="w-4 h-4 text-calm-500" /> HIPAA Inspired
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <HiClock className="w-4 h-4 text-primary-500" /> 24/7 Support
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <HiStar className="w-4 h-4 text-yellow-500" /> 4.9/5 Rating
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS SECTION ─────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div {...stagger} variants={staggerChildren}
            className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div key={i} variants={fadeChild}
                className="glass-card p-6 text-center">
                <p className="font-display font-black text-3xl md:text-4xl gradient-text mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-surface-500 dark:text-surface-400 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES SECTION ──────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <span className="badge-primary mb-4 inline-block">Features</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-surface-900 dark:text-white mb-4">
              Everything You Need for <span className="gradient-text">Mental Wellness</span>
            </h2>
            <p className="text-surface-500 dark:text-surface-400 max-w-2xl mx-auto">
              Our platform combines cutting-edge AI technology with evidence-based mental health practices
              to provide you comprehensive wellness support.
            </p>
          </motion.div>

          <motion.div {...stagger} variants={staggerChildren}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={i} variants={fadeChild}
                className="glass-card p-6 group cursor-default">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.color}
                                flex items-center justify-center mb-4 shadow-lg
                                group-hover:scale-110 transition-transform duration-300`}>
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display font-bold text-lg text-surface-900 dark:text-white mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <span className="badge-calm mb-4 inline-block">How It Works</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-surface-900 dark:text-white mb-4">
              Start in <span className="gradient-text-calm">Four Simple Steps</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)}
                className="relative glass-card p-6 text-center group">
                <div className="font-display font-black text-5xl text-primary-100 dark:text-primary-900/40 mb-2
                                group-hover:text-primary-200 dark:group-hover:text-primary-800/60 transition-colors">
                  {step.num}
                </div>
                <h3 className="font-display font-bold text-surface-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-sm text-surface-500 dark:text-surface-400">{step.desc}</p>
                {/* Connector line */}
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 border-t-2 border-dashed border-primary-300 dark:border-primary-700" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ───────────────────────────────────────── */}
      <section className="py-20 px-4">
        <motion.div {...fadeUp()}
          className="max-w-4xl mx-auto rounded-3xl overflow-hidden relative">
          <div className="hero-gradient p-12 md:p-16 text-center relative z-10">
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
            <div className="relative">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
                Ready to Take Care of Your Mind?
              </h2>
              <p className="text-white/80 max-w-xl mx-auto mb-8">
                Join thousands of users who have improved their mental wellness with MindCare AI.
                Start your journey today — it's completely free.
              </p>
              <Link to="/register" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl
                  bg-white text-primary-600 font-bold text-base shadow-xl
                  hover:bg-surface-50 hover:shadow-2xl hover:-translate-y-0.5
                  active:scale-95 transition-all duration-200">
                <HiHeart className="w-5 h-5" />
                Get Started Free
                <HiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer className="border-t border-surface-200 dark:border-surface-800 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg hero-gradient flex items-center justify-center">
                  <HiHeart className="w-4 h-4 text-white" />
                </div>
                <span className="font-display font-bold text-lg text-surface-900 dark:text-white">
                  MindCare AI
                </span>
              </div>
              <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">
                AI-powered mental wellness monitoring for a healthier, happier life.
              </p>
            </div>

            {/* Product links */}
            <div>
              <h4 className="font-semibold text-surface-900 dark:text-white mb-4 text-sm">Product</h4>
              <ul className="space-y-2 text-sm text-surface-500 dark:text-surface-400">
                <li><Link to="/about" className="hover:text-primary-500 transition-colors">About</Link></li>
                <li><Link to="/register" className="hover:text-primary-500 transition-colors">Sign Up</Link></li>
                <li><Link to="/login" className="hover:text-primary-500 transition-colors">Login</Link></li>
              </ul>
            </div>

            {/* Features links */}
            <div>
              <h4 className="font-semibold text-surface-900 dark:text-white mb-4 text-sm">Features</h4>
              <ul className="space-y-2 text-sm text-surface-500 dark:text-surface-400">
                <li>Mood Tracking</li>
                <li>AI Chatbot</li>
                <li>Stress Prediction</li>
                <li>Journal Analysis</li>
              </ul>
            </div>

            {/* Support links */}
            <div>
              <h4 className="font-semibold text-surface-900 dark:text-white mb-4 text-sm">Support</h4>
              <ul className="space-y-2 text-sm text-surface-500 dark:text-surface-400">
                <li><Link to="/emergency" className="hover:text-primary-500 transition-colors">Emergency Help</Link></li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-surface-200 dark:border-surface-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-surface-400">&copy; 2026 MindCare AI. All rights reserved.</p>
            <div className="flex items-center gap-4 text-surface-400">
              <HiUserGroup className="w-5 h-5 hover:text-primary-500 cursor-pointer transition-colors" />
              <HiHeart className="w-5 h-5 hover:text-primary-500 cursor-pointer transition-colors" />
              <HiChat className="w-5 h-5 hover:text-primary-500 cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
