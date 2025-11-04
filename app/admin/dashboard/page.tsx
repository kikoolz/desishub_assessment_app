'use client'

import { useEffect, useState } from 'react'
import { Users, TrendingUp, Award, Activity } from 'lucide-react'
import CardDataStats from '@/components/TailAdmin/CardDataStats'
import ChartOne from '@/components/TailAdmin/Charts/ChartOne'
import TierDistributionChart from '@/components/TailAdmin/Charts/TierDistributionChart'

interface Stats {
  totalCandidates: number
  tier4Count: number
  weeklyCount: number
  avgTier: number
  tierDistribution: Array<{ tier: number; count: number }>
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalCandidates: 0,
    tier4Count: 0,
    weeklyCount: 0,
    avgTier: 0,
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
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <CardDataStats
          title="Total Candidates"
          total={stats.totalCandidates.toString()}
          rate="11.01%"
          levelUp
        >
          <Users className="h-6 w-6" />
        </CardDataStats>

        <CardDataStats
          title="Tier 4 Developers"
          total={stats.tier4Count.toString()}
          rate="9.05%"
          levelDown
        >
          <Award className="h-6 w-6" />
        </CardDataStats>

        <CardDataStats
          title="New This Week"
          total={stats.weeklyCount.toString()}
          rate="12.5%"
          levelUp
        >
          <TrendingUp className="h-6 w-6" />
        </CardDataStats>

        <CardDataStats
          title="Average Tier"
          total={stats.avgTier.toFixed(1)}
          rate="5.2%"
          levelUp
        >
          <Activity className="h-6 w-6" />
        </CardDataStats>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <TierDistributionChart data={stats.tierDistribution} />
        </div>
        <div className="lg:col-span-7">
          <ChartOne />
        </div>
      </div>
    </div>
  )
}

