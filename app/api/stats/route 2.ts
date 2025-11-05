import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Total candidates
    const totalCandidates = await prisma.candidate.count()

    // Tier 4 count
    const tier4Count = await prisma.candidate.count({
      where: { assignedTier: 4 },
    })

    // Weekly count (last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const weeklyCount = await prisma.candidate.count({
      where: {
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
    })

    // Average tier
    const candidates = await prisma.candidate.findMany({
      select: { assignedTier: true },
    })
    const avgTier =
      candidates.length > 0
        ? candidates.reduce((sum, c) => sum + c.assignedTier, 0) /
          candidates.length
        : 0

    // Tier distribution
    const tierDistribution = await Promise.all([
      prisma.candidate.count({ where: { assignedTier: 0 } }),
      prisma.candidate.count({ where: { assignedTier: 1 } }),
      prisma.candidate.count({ where: { assignedTier: 2 } }),
      prisma.candidate.count({ where: { assignedTier: 3 } }),
      prisma.candidate.count({ where: { assignedTier: 4 } }),
    ])

    return NextResponse.json({
      totalCandidates,
      tier4Count,
      weeklyCount,
      avgTier,
      tierDistribution: tierDistribution.map((count, index) => ({
        tier: index,
        count,
      })),
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}

