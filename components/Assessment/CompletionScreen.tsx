'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Trophy, Target, Lightbulb, ArrowRight } from 'lucide-react'

interface TierResult {
  tier: number
  tierName: string
  description: string
  recommendations: string[]
}

interface CompletionScreenProps {
  tierResult: TierResult
  onViewDashboard: () => void
}

export default function CompletionScreen({
  tierResult,
  onViewDashboard,
}: CompletionScreenProps) {
  useEffect(() => {
    // Trigger confetti animation
    const duration = 3000
    const end = Date.now() + duration
    const colors = ['#6366f1', '#8b5cf6', '#ec4899']

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      })
      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }

    frame()
  }, [])

  const tierColors: Record<number, string> = {
    0: 'bg-red-500',
    1: 'bg-blue-500',
    2: 'bg-green-500',
    3: 'bg-yellow-500',
    4: 'bg-purple-500',
  }

  return (
    <div className="text-center space-y-8">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', duration: 0.8 }}
        className="relative"
      >
        <div
          className={`w-32 h-32 ${
            tierColors[tierResult.tier] || 'bg-gray-500'
          } rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl`}
        >
          <Trophy className="w-16 h-16 text-white" />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
        >
          <span className="px-6 py-2 bg-white rounded-full shadow-lg font-bold text-lg">
            Tier {tierResult.tier}
          </span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          🎉 Congratulations!
        </h1>
        <h2 className="text-2xl font-semibold text-indigo-600 mb-3">
          {tierResult.tierName}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {tierResult.description}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 max-w-2xl mx-auto"
      >
        <div className="flex items-center gap-3 mb-4">
          <Lightbulb className="w-6 h-6 text-indigo-600" />
          <h3 className="text-xl font-bold text-gray-900">
            Recommendations for Growth
          </h3>
        </div>
        <ul className="space-y-3 text-left">
          {tierResult.recommendations.map((rec, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="flex items-start gap-3"
            >
              <Target className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{rec}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="space-y-4"
      >
        <button
          onClick={onViewDashboard}
          className="px-12 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-xl hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-lg inline-flex items-center gap-2"
        >
          View Dashboard
          <ArrowRight className="w-5 h-5" />
        </button>
        <p className="text-sm text-gray-500">
          Your assessment has been saved. Check your email for next steps!
        </p>
      </motion.div>
    </div>
  )
}

