'use client'

import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const personalInfoSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  linkedIn: z.string().url('Invalid LinkedIn URL').optional().or(z.literal('')),
})

type PersonalInfoFormData = z.infer<typeof personalInfoSchema>

interface PersonalInfoFormProps {
  onSubmit: (data: PersonalInfoFormData) => void
  onBack: () => void
}

export default function PersonalInfoForm({
  onSubmit,
  onBack,
}: PersonalInfoFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    mode: 'onChange',
  })

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Let&apos;s start with your information
        </h2>
        <p className="text-gray-600">We&apos;ll use this to create your profile</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Label htmlFor="name" className="text-base font-medium">
            Full Name *
          </Label>
          <Input
            id="name"
            {...register('name')}
            className="mt-2 h-12 text-base"
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Label htmlFor="email" className="text-base font-medium">
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            className="mt-2 h-12 text-base"
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Label htmlFor="phone" className="text-base font-medium">
            Phone Number *
          </Label>
          <Input
            id="phone"
            type="tel"
            {...register('phone')}
            className="mt-2 h-12 text-base"
            placeholder="+1234567890"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Label htmlFor="linkedIn" className="text-base font-medium">
            LinkedIn Profile (Optional)
          </Label>
          <Input
            id="linkedIn"
            {...register('linkedIn')}
            className="mt-2 h-12 text-base"
            placeholder="https://linkedin.com/in/johndoe"
          />
          {errors.linkedIn && (
            <p className="text-red-500 text-sm mt-1">
              {errors.linkedIn.message}
            </p>
          )}
        </motion.div>

        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 text-gray-600 hover:text-gray-900 transition"
          >
            ← Back
          </button>
          <button
            type="submit"
            disabled={!isValid}
            className="flex-1 px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
          >
            Continue →
          </button>
        </div>
      </form>
    </div>
  )
}

