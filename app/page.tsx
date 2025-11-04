"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Rocket, Users, Award, TrendingUp, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/">
            <h1 className="text-2xl font-bold text-gray-900">Desishub</h1>
          </Link>
          <div className="flex gap-4">
            <Link
              href="/assessment"
              className="px-6 py-2 text-gray-700 hover:text-gray-900 font-medium transition"
            >
              Take Assessment
            </Link>
            <Link
              href="/admin/dashboard"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Admin Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Join the <span className="text-indigo-600">Desishub</span> Developer
            Community
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Take our quick skill assessment and find your perfect tier. Get
            personalized recommendations and join a community of developers at
            your level.
          </p>
          <Link
            href="/assessment"
            className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-xl hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Start Your Assessment
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto"
        >
          <div className="p-6 bg-white rounded-2xl shadow-lg">
            <Users className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-gray-900 mb-2">5000+</h3>
            <p className="text-gray-600">Developers Assessed</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-lg">
            <Award className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-gray-900 mb-2">5 Tiers</h3>
            <p className="text-gray-600">Skill Levels</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-lg">
            <TrendingUp className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-gray-900 mb-2">100%</h3>
            <p className="text-gray-600">Free Forever</p>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-indigo-600">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-4">Take the Assessment</h3>
            <p className="text-gray-600">
              Answer a few quick questions about your technical skills and
              experience.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-indigo-600">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-4">Get Your Tier</h3>
            <p className="text-gray-600">
              Receive your skill tier instantly with a detailed assessment of
              your abilities.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-indigo-600">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-4">Start Growing</h3>
            <p className="text-gray-600">
              Get personalized recommendations and connect with developers at
              your level.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tiers Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
          Developer Tiers
        </h2>
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          We categorize developers into 5 tiers based on their skills and
          experience
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              tier: 0,
              name: "Beginner",
              color: "from-red-400 to-red-500",
              desc: "HTML, CSS, JS basics with React knowledge",
            },
            {
              tier: 1,
              name: "CRUD Developer",
              color: "from-blue-400 to-blue-500",
              desc: "Can build CRUD apps with databases",
            },
            {
              tier: 2,
              name: "Full-Stack Next.js",
              color: "from-green-400 to-green-500",
              desc: "Authenticated apps with deployment skills",
            },
            {
              tier: 3,
              name: "Multi-Framework",
              color: "from-yellow-400 to-yellow-500",
              desc: "Express/Hono APIs with documentation",
            },
            {
              tier: 4,
              name: "Advanced Full-Stack",
              color: "from-purple-400 to-purple-500",
              desc: "Multiple frameworks including Golang",
            },
          ].map((tier) => (
            <motion.div
              key={tier.tier}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition"
            >
              <div
                className={`w-12 h-12 bg-gradient-to-br ${tier.color} rounded-full flex items-center justify-center mb-4`}
              >
                <span className="text-white font-bold text-lg">
                  {tier.tier}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Tier {tier.tier}: {tier.name}
              </h3>
              <p className="text-gray-600">{tier.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-center text-white"
        >
          <Rocket className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">Ready to Find Your Tier?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of developers who have discovered their skill level
            and received personalized growth recommendations.
          </p>
          <Link
            href="/assessment"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 text-lg font-semibold rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
          >
            Start Assessment Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-600">
        <p>&copy; 2025 Desishub. All rights reserved.</p>
      </footer>
    </div>
  );
}
