'use client'

import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

interface Option {
  value: string
  label: string
  icon: string
}

interface QuestionCardProps {
  question: {
    question: string
    subtitle?: string
    options: Option[]
    allowMultiple?: boolean
  }
  answer: any
  onAnswer: (answer: any) => void
  onBack: () => void
}

export default function QuestionCard({
  question,
  answer,
  onAnswer,
  onBack,
}: QuestionCardProps) {
  const handleOptionClick = (value: string) => {
    if (question.allowMultiple) {
      const currentAnswers = Array.isArray(answer) ? answer : []
      if (currentAnswers.includes(value)) {
        onAnswer(currentAnswers.filter((v) => v !== value))
      } else {
        onAnswer([...currentAnswers, value])
      }
    } else {
      onAnswer(value)
    }
  }

  const isSelected = (value: string) => {
    if (question.allowMultiple) {
      return Array.isArray(answer) && answer.includes(value)
    }
    return answer === value
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {question.question}
        </h2>
        {question.subtitle && (
          <p className="text-gray-600">{question.subtitle}</p>
        )}
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <motion.button
            key={option.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleOptionClick(option.value)}
            className={`
              w-full p-6 rounded-xl border-2 text-left transition-all
              flex items-center gap-4 hover:shadow-md
              ${
                isSelected(option.value)
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300'
              }
            `}
          >
            <span className="text-3xl">{option.icon}</span>
            <span className="flex-1 font-medium text-gray-900">
              {option.label}
            </span>
            {isSelected(option.value) && (
              <CheckCircle2 className="w-6 h-6 text-indigo-600" />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

