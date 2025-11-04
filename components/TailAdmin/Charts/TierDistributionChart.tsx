'use client'

import dynamic from 'next/dynamic'
import { ApexOptions } from 'apexcharts'

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})

interface TierDistributionChartProps {
  data: Array<{ tier: number; count: number }>
}

const tierColors = ['#EF4444', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6']
const tierNames = ['Tier 0', 'Tier 1', 'Tier 2', 'Tier 3', 'Tier 4']

export default function TierDistributionChart({
  data,
}: TierDistributionChartProps) {
  const series = data.map((item) => item.count)

  const options: ApexOptions = {
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'donut',
    },
    colors: tierColors,
    labels: tierNames,
    legend: {
      show: true,
      position: 'bottom',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          background: 'transparent',
        },
      },
    },
    dataLabels: {
      enabled: true,
    },
    responsive: [
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 300,
          },
        },
      },
    ],
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white px-6 pt-7 pb-6 shadow-sm dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <div className="mb-6">
        <h5 className="text-xl font-semibold text-gray-900 dark:text-white">
          Tier Distribution
        </h5>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Candidate skill level breakdown
        </p>
      </div>
      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={series}
            type="donut"
            height={350}
          />
        </div>
      </div>
    </div>
  )
}

