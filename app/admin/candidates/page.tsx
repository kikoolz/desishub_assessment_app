'use client'

import { useEffect, useState } from 'react'
import { Search, Download, Eye, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import toast from 'react-hot-toast'

interface Candidate {
  id: string
  name: string
  email: string
  phone: string
  assignedTier: number
  tierName: string
  createdAt: string
}

const tierColors: Record<number, string> = {
  0: 'bg-red-500',
  1: 'bg-blue-500',
  2: 'bg-green-500',
  3: 'bg-yellow-500',
  4: 'bg-purple-500',
}

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterTier, setFilterTier] = useState('all')
  const [sortBy, setSortBy] = useState('createdAt')

  useEffect(() => {
    fetchCandidates()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterTier, sortBy])

  const fetchCandidates = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        tier: filterTier,
        sortBy: sortBy,
        sortOrder: 'desc',
      })

      const response = await fetch(`/api/candidates?${params}`)
      const data = await response.json()
      setCandidates(data.candidates)
    } catch (error) {
      console.error('Error fetching candidates:', error)
      toast.error('Failed to fetch candidates')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchCandidates()
      return
    }

    try {
      const params = new URLSearchParams({
        search: searchQuery,
        tier: filterTier,
        sortBy: sortBy,
      })

      const response = await fetch(`/api/candidates?${params}`)
      const data = await response.json()
      setCandidates(data.candidates)
    } catch (error) {
      console.error('Error searching candidates:', error)
      toast.error('Failed to search candidates')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this candidate?')) return

    try {
      const response = await fetch(`/api/candidates/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success('Candidate deleted successfully')
        fetchCandidates()
      } else {
        toast.error('Failed to delete candidate')
      }
    } catch (error) {
      console.error('Error deleting candidate:', error)
      toast.error('Failed to delete candidate')
    }
  }

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Tier', 'Date']
    const rows = candidates.map((c) => [
      c.name,
      c.email,
      c.phone,
      `Tier ${c.assignedTier}`,
      new Date(c.createdAt).toLocaleDateString(),
    ])

    const csv = [headers.join(','), ...rows.map((row) => row.join(','))].join(
      '\n'
    )

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `candidates-${new Date().toISOString()}.csv`
    a.click()
    toast.success('CSV exported successfully')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            All Candidates
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Manage and view all candidate assessments
          </p>
        </div>
        <button
          onClick={exportToCSV}
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-shadow hover:shadow-md hover:from-blue-700 hover:to-blue-800"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      {/* Filters and Search */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-strokedark dark:bg-boxdark">
        <div className="p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Search */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-strokedark dark:bg-boxdark-2 dark:text-white dark:placeholder:text-gray-500"
              />
            </div>

            {/* Tier Filter */}
            <select
              value={filterTier}
              onChange={(e) => setFilterTier(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white py-2.5 px-4 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-strokedark dark:bg-boxdark-2 dark:text-white"
            >
              <option value="all">All Tiers</option>
              <option value="0">Tier 0</option>
              <option value="1">Tier 1</option>
              <option value="2">Tier 2</option>
              <option value="3">Tier 3</option>
              <option value="4">Tier 4</option>
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white py-2.5 px-4 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-strokedark dark:bg-boxdark-2 dark:text-white"
            >
              <option value="createdAt">Date (Newest)</option>
              <option value="name">Name (A-Z)</option>
              <option value="assignedTier">Tier (Low-High)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Candidates Table */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-strokedark dark:bg-boxdark">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 dark:border-strokedark dark:bg-boxdark-2">
                <th className="min-w-[220px] px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Name
                </th>
                <th className="min-w-[150px] px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Email
                </th>
                <th className="min-w-[120px] px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Phone
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Tier
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:divide-strokedark dark:bg-boxdark">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Loading candidates...</p>
                    </div>
                  </td>
                </tr>
              ) : candidates.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <p className="text-base font-semibold text-gray-900 dark:text-white">No candidates found</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                candidates.map((candidate) => (
                  <tr
                    key={candidate.id}
                    className="transition-colors hover:bg-gray-50 dark:hover:bg-boxdark-2"
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">
                        {candidate.name}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-700 dark:text-gray-300">
                        {candidate.email}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-700 dark:text-gray-300">
                        {candidate.phone}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <Badge
                        className={`${
                          tierColors[candidate.assignedTier] || 'bg-gray-500'
                        } text-white text-xs font-semibold rounded-full px-3 py-1`}
                      >
                        Tier {candidate.assignedTier}
                      </Badge>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-700 dark:text-gray-300">
                        {new Date(candidate.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/admin/candidates/${candidate.id}`}
                          className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
                          title="View details"
                        >
                          <Eye className="h-5 w-5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(candidate.id)}
                          className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                          title="Delete candidate"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

