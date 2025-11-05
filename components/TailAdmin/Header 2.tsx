'use client'

import { Menu, Search, Bell, User, LogOut } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { toast } from 'react-hot-toast'

interface HeaderProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export default function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showDropdown])

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false })
      toast.success('Logged out successfully')
      router.push('/admin/login')
      router.refresh()
    } catch (error) {
      toast.error('Failed to logout')
    }
  }

  const userName = session?.user?.name || 'Admin User'
  const userEmail = session?.user?.email || 'admin@example.com'

  return (
    <header className="sticky top-0 z-10 flex w-full border-b border-gray-200 bg-white dark:border-strokedark dark:bg-boxdark">
      <div className="flex flex-grow items-center justify-between px-4 py-4 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* Hamburger Toggle BTN */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation()
              setSidebarOpen(!sidebarOpen)
            }}
            className="z-30 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <div className="hidden sm:block">
          <h2 className="text-title-md2 font-semibold text-black dark:text-white">
            Candidate Management
          </h2>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          {/* Search */}
          <div className="relative hidden sm:block">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search or type command..."
              className="h-10 w-64 rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-20 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-strokedark dark:bg-boxdark-2 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-blue-500"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <kbd className="rounded border border-gray-300 bg-white px-1.5 py-0.5 text-xs font-semibold text-gray-500 shadow-sm dark:border-gray-600 dark:bg-boxdark dark:text-gray-400">
                ⌘ K
              </kbd>
            </div>
          </div>

          {/* Notifications */}
          <button className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white hover:bg-gray-50 dark:border-strokedark dark:bg-boxdark-2 dark:hover:bg-boxdark">
            <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange-500">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-500 opacity-75"></span>
            </span>
          </button>

          {/* User Area */}
          <div className="relative flex items-center gap-3" ref={dropdownRef}>
            <div className="hidden text-right lg:block">
              <span className="block text-sm font-medium text-black dark:text-white">
                {userName}
              </span>
              <span className="block text-xs text-gray-600 dark:text-gray-400">
                {userEmail}
              </span>
            </div>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-sm hover:shadow-md transition-shadow"
            >
              <User className="h-5 w-5" />
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 top-full mt-2 w-48 rounded-md bg-white dark:bg-boxdark shadow-lg border border-stroke dark:border-strokedark z-50">
                <div className="py-1">
                  <div className="px-4 py-2 border-b border-stroke dark:border-strokedark">
                    <p className="text-sm font-medium text-black dark:text-white">{userName}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{userEmail}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-boxdark-2 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

