'use client'

import { useEffect, useState } from 'react'
import TierDistributionChart from '@/components/TailAdmin/Charts/TierDistributionChart'

interface Stats {
  tierDistribution: Array<{ tier: number; count: number }>
}

export default function AnalyticsPage() {
  const [stats, setStats] = useState<Stats>({
    tierDistribution: [],
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        Analytics Dashboard
      </h2>

      <div className="grid grid-cols-1 gap-4 md:gap-6 2xl:gap-7.5">
        <TierDistributionChart data={stats.tierDistribution} />
      </div>
    </div>
  )
}

