'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Mail, Phone, Linkedin, Calendar, Award } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface Candidate {
  id: string
  name: string
  email: string
  phone: string
  linkedIn?: string
  webTechnologies: string[]
  canBuildCRUD: string
  canImplementAuth: string
  backendFrameworks: string[]
  knowsGolang: string
  hasDeployed: string
  canBuildAuthAPI: string
  assignedTier: number
  tierName: string
  tierDescription: string
  recommendations: string[]
  createdAt: string
}

const tierColors: Record<number, string> = {
  0: 'bg-red-500',
  1: 'bg-blue-500',
  2: 'bg-green-500',
  3: 'bg-yellow-500',
  4: 'bg-purple-500',
}

export default function CandidateDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [candidate, setCandidate] = useState<Candidate | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetchCandidate()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id])

  const fetchCandidate = async () => {
    try {
      const response = await fetch(`/api/candidates/${params.id}`)
      const data = await response.json()
      setCandidate(data.candidate)
    } catch (error) {
      console.error('Error fetching candidate:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Loading candidate details...</p>
        </div>
      </div>
    )
  }

  if (!candidate) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-12 text-center shadow-sm dark:border-strokedark dark:bg-boxdark">
        <p className="text-xl font-semibold text-gray-900 dark:text-white">Candidate not found</p>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">The candidate you&apos;re looking for doesn&apos;t exist or has been removed.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-strokedark dark:bg-boxdark dark:text-gray-300 dark:hover:bg-boxdark-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </div>

      {/* Candidate Info Card */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-gray-200 px-6 py-5 dark:border-strokedark">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Candidate Information
          </h3>
        </div>
        <div className="p-6">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                {candidate.name}
              </h2>
              <Badge
                className={`${
                  tierColors[candidate.assignedTier] || 'bg-gray-500'
                } text-white text-base font-semibold py-1.5 px-4 rounded-full`}
              >
                Tier {candidate.assignedTier} - {candidate.tierName}
              </Badge>
            </div>
            <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
              <Award className="h-10 w-10" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-start gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-strokedark dark:bg-boxdark-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20">
                <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">Email</p>
                <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">{candidate.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-strokedark dark:bg-boxdark-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/20">
                <Phone className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">Phone</p>
                <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">{candidate.phone}</p>
              </div>
            </div>
            {candidate.linkedIn && (
              <div className="flex items-start gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-strokedark dark:bg-boxdark-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20">
                  <Linkedin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">LinkedIn</p>
                  <a
                    href={candidate.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    View Profile →
                  </a>
                </div>
              </div>
            )}
            <div className="flex items-start gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-strokedark dark:bg-boxdark-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/20">
                <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">Registered</p>
                <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                  {new Date(candidate.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 dark:border-blue-800 dark:from-blue-900/20 dark:to-indigo-900/20">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                <Award className="h-4 w-4" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Tier Assessment</h4>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {candidate.tierDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Skills Assessment */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-gray-200 px-6 py-5 dark:border-strokedark">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Skills Assessment Responses
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-5 dark:border-strokedark dark:bg-boxdark-2">
              <h5 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-300">Web Technologies</h5>
              <div className="flex flex-wrap gap-2">
                {candidate.webTechnologies.length > 0 ? (
                  candidate.webTechnologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="capitalize border-gray-300 bg-white text-gray-700 dark:border-gray-600 dark:bg-boxdark dark:text-gray-300">
                      {tech}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-gray-500">None</span>
                )}
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-5 dark:border-strokedark dark:bg-boxdark-2">
              <h5 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-300">Can Build CRUD Application?</h5>
              <p className="text-base font-semibold text-gray-900 dark:text-white capitalize">
                {candidate.canBuildCRUD.replace('-', ' ')}
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-5 dark:border-strokedark dark:bg-boxdark-2">
              <h5 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-300">Authentication Skills</h5>
              <p className="text-base font-semibold text-gray-900 dark:text-white capitalize">
                {candidate.canImplementAuth}
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-5 dark:border-strokedark dark:bg-boxdark-2">
              <h5 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-300">Backend Frameworks</h5>
              <div className="flex flex-wrap gap-2">
                {candidate.backendFrameworks.length > 0 ? (
                  candidate.backendFrameworks.map((framework) => (
                    <Badge key={framework} variant="secondary" className="capitalize border-gray-300 bg-white text-gray-700 dark:border-gray-600 dark:bg-boxdark dark:text-gray-300">
                      {framework}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-gray-500">None</span>
                )}
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-5 dark:border-strokedark dark:bg-boxdark-2">
              <h5 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-300">Golang Knowledge</h5>
              <p className="text-base font-semibold text-gray-900 dark:text-white capitalize">
                {candidate.knowsGolang.replace('-', ' ')}
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-5 dark:border-strokedark dark:bg-boxdark-2">
              <h5 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-300">Deployment Experience</h5>
              <p className="text-base font-semibold text-gray-900 dark:text-white capitalize">
                {candidate.hasDeployed.replace('-', ' ')}
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-5 dark:border-strokedark dark:bg-boxdark-2 md:col-span-2">
              <h5 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-300">
                Can Build Authenticated CRUD APIs?
              </h5>
              <p className="text-base font-semibold text-gray-900 dark:text-white capitalize">
                {candidate.canBuildAuthAPI.replace('-', ' ')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-gray-200 px-6 py-5 dark:border-strokedark">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Growth Recommendations
          </h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Personalized learning path to advance to the next tier
          </p>
        </div>
        <div className="p-6">
          <ul className="space-y-4">
            {candidate.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 transition-shadow hover:shadow-md dark:border-strokedark dark:bg-boxdark-2">
                <span className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white text-sm font-bold shadow-sm">
                  {index + 1}
                </span>
                <span className="flex-1 pt-1 text-gray-700 dark:text-gray-300 leading-relaxed">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

