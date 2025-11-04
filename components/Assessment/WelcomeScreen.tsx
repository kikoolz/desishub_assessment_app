"use client";

import { motion } from "framer-motion";
import { Rocket, Clock, Award } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="text-center space-y-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
      >
        <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Rocket className="w-12 h-12 text-white" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Welcome to Desishub
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Let&apos;s assess your technical skills and find the perfect tier for
          you
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto"
      >
        <div className="p-6 bg-gray-50 rounded-xl">
          <Clock className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Quick & Easy</h3>
          <p className="text-sm text-gray-600">Takes only 3-5 minutes</p>
        </div>

        <div className="p-6 bg-gray-50 rounded-xl">
          <Award className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Get Your Tier</h3>
          <p className="text-sm text-gray-600">Instant skill assessment</p>
        </div>

        <div className="p-6 bg-gray-50 rounded-xl">
          <Rocket className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Join Our Team</h3>
          <p className="text-sm text-gray-600">Start your journey</p>
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        onClick={onStart}
        className="px-12 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-xl hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-lg"
      >
        Start Assessment →
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-sm text-gray-500"
      >
        No account needed • 100% free • Instant results
      </motion.p>
    </div>
  );
}
