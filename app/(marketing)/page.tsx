'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, MapPin, Clock, Trophy, Users, ArrowRight } from 'lucide-react'

export default function LandingPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Adventure Seeker',
      content: 'Found 47 hidden gems in 3 months. The time-tracking keeps me motivated to explore more.',
      avatar: '👩‍🦰',
    },
    {
      name: 'Marcus Rivera',
      role: 'Urban Explorer',
      content: 'Discovered niche cafes and art spaces I never knew existed. Best exploration tool ever.',
      avatar: '👨‍🦱',
    },
    {
      name: 'Elena Patel',
      role: 'Travel Enthusiast',
      content: 'Challenge mode transformed how I explore cities. Feels like a game but the discoveries are real.',
      avatar: '👩‍🦲',
    },
  ]

  const features = [
    {
      icon: MapPin,
      title: 'Discover Niche Spots',
      description: 'Find hidden gems and local favorites that most tourists miss. Personalized recommendations for unique experiences.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Clock,
      title: 'Track Your Time',
      description: 'Log exploration hours and watch your journey unfold. Get motivated by time-based challenges and milestones.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Trophy,
      title: 'Earn Badges',
      description: 'Complete exploration challenges and unlock achievements. Rise on global leaderboards and showcase your discoveries.',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Users,
      title: 'Join the Community',
      description: 'Share your finds with fellow explorers. Get tips from locals and build your exploration network.',
      color: 'from-green-500 to-emerald-500',
    },
  ]

  const timeline = [
    {
      step: '1',
      title: 'Create Your Profile',
      description: 'Sign up and tell us your favorite types of places. Set your exploration goals and preferences.',
    },
    {
      step: '2',
      title: 'Start Exploring',
      description: 'Discover nearby hidden gems with our smart recommendations. Each place tells a unique story.',
    },
    {
      step: '3',
      title: 'Track & Share',
      description: 'Log your visits, snap photos, and share reviews. Build your personal discovery timeline.',
    },
    {
      step: '4',
      title: 'Unlock Achievements',
      description: 'Complete challenges, earn badges, and climb leaderboards. Connect with other explorers worldwide.',
    },
  ]

  const stats = [
    { label: 'Cities Explored', value: '150+', icon: '🌍' },
    { label: 'Hours of Discovery', value: '50K+', icon: '⏱️' },
    { label: 'Hidden Gems Found', value: '12K+', icon: '💎' },
    { label: 'Active Explorers', value: '25K+', icon: '👥' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 min-h-[100vh] flex items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 -z-10"
        >
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-soft" />
          <div className="absolute -bottom-8 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-soft" />
        </motion.div>

        <div className="max-w-5xl mx-auto w-full text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            className="space-y-6 sm:space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-2">
              <div className="inline-block px-3 sm:px-4 py-1 sm:py-2 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-medium animate-fade-in">
                ✨ Discover What You&apos;ve Been Missing
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900"
            >
              Turn Every Moment Into an{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Adventure
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto px-0 sm:px-4"
            >
              Track time exploring niche spots. Discover hidden gems across your city. Join thousands of explorers building their legacy, one discovery at a time.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4 sm:pt-6"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white rounded-lg font-semibold text-sm sm:text-base flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-lg"
              >
                Join the Waitlist <ArrowRight className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-slate-300 text-slate-900 rounded-lg font-semibold text-sm sm:text-base hover:border-slate-400 hover:bg-slate-50 transition-colors"
              >
                Watch Demo
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Discover More with Every Click
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              Our platform makes exploration intuitive, rewarding, and fun. Here&apos;s what makes us different.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="p-4 sm:p-6 rounded-xl border border-slate-200 bg-white hover:shadow-lg transition-all"
                >
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 text-white`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* How It Works Timeline */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 bg-gradient-to-b from-transparent via-slate-50 to-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              From signup to your first discovery, it takes just minutes to start exploring.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: '-100px' }}
                className="relative"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center font-bold text-lg mb-4 flex-shrink-0">
                    {item.step}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600">
                    {item.description}
                  </p>
                </div>
                {index < timeline.length - 1 && (
                  <div className="hidden lg:block absolute top-14 -right-8 w-16 h-0.5 bg-gradient-to-r from-blue-300 to-transparent" />
                )}
                {index < timeline.length - 1 && (
                  <div className="lg:hidden flex justify-center mt-6">
                    <ChevronRight className="w-5 h-5 text-slate-400 rotate-90" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Ribbon */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl mb-2">{stat.icon}</div>
                <div className="text-2xl sm:text-3xl font-bold mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-slate-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Slider */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              What Explorers Say
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Join thousands of adventurers building their exploration legacy.
            </p>
          </motion.div>

          <div className="relative">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 sm:p-8 md:p-10 border border-slate-200"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-lg">
                    ⭐
                  </span>
                ))}
              </div>
              <p className="text-base sm:text-lg text-slate-700 mb-6 leading-relaxed">
                &ldquo;{testimonials[activeTestimonial].content}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-xl">
                  {testimonials[activeTestimonial].avatar}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-slate-900">
                    {testimonials[activeTestimonial].name}
                  </p>
                  <p className="text-sm text-slate-600">
                    {testimonials[activeTestimonial].role}
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === activeTestimonial
                      ? 'bg-blue-600 w-8'
                      : 'bg-slate-300 w-2 hover:bg-slate-400'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Ready to Start Your Journey?
            </h2>
            <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto">
              Join our waitlist and be the first to explore hidden gems, track your adventures, and unlock exclusive features when we launch.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 rounded-lg font-semibold text-sm sm:text-base hover:bg-blue-50 transition-colors"
              >
                Join Waitlist <span className="ml-2">→</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white rounded-lg font-semibold text-sm sm:text-base hover:bg-white/10 transition-colors"
              >
                Share with Friends
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-slate-900 text-slate-400 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Community</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Guides</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Stories</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm">© 2024 Explore. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">Discord</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
