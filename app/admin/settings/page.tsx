'use client'

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        Settings
      </h2>

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Platform Settings
          </h3>
        </div>
        <div className="p-7">
          <p className="text-gray-600">
            Settings page coming soon. Configure your platform preferences here.
          </p>
        </div>
      </div>
    </div>
  )
}

