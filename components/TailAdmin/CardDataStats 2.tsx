import { ReactNode } from "react";

interface CardDataStatsProps {
  title: string;
  total: string;
  rate: string;
  levelUp?: boolean;
  levelDown?: boolean;
  children: ReactNode;
}

export default function CardDataStats({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  children,
}: CardDataStatsProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/20">
          <div className="text-blue-600 dark:text-blue-400">
            {children}
          </div>
        </div>
        {(levelUp || levelDown) && (
          <span
            className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
              levelUp
                ? "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                : "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"
            }`}
          >
            {levelUp ? (
              <svg
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            ) : (
              <svg
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                />
              </svg>
            )}
            {levelUp ? "+" : "-"} {rate}
          </span>
        )}
      </div>
      <div className="mt-6">
        <h4 className="text-3xl font-bold text-gray-900 dark:text-white">
          {total}
        </h4>
        <p className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">
          {title}
        </p>
      </div>
    </div>
  );
}
