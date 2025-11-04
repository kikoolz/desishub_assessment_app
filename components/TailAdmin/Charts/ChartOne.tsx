"use client";

import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function ChartOne() {
  const options: ApexOptions = {
    chart: {
      type: "bar",
      fontFamily: "Satoshi, sans-serif",
      height: 335,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 2,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: "0px",
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " candidates";
        },
      },
    },
  };

  const series = [
    {
      name: "Candidates",
      data: [2, 5, 3, 8, 4, 6, 3],
    },
  ];

  return (
    <div className="rounded-lg border border-gray-200 bg-white px-6 pt-7 pb-6 shadow-sm dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div>
          <h5 className="text-xl font-semibold text-gray-900 dark:text-white">
            Monthly Registrations
          </h5>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Weekly candidate registrations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex h-3 w-3 items-center justify-center rounded-full">
            <span className="block h-2.5 w-2.5 rounded-full bg-blue-500"></span>
          </span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Candidates
          </span>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5 -mb-9">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
}
