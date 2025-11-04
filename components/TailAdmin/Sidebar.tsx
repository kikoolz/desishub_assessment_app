"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, BarChart3, Settings, X } from "lucide-react";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const menuItems = [
  {
    icon: Home,
    label: "Dashboard",
    href: "/admin/dashboard",
  },
  {
    icon: Users,
    label: "Candidates",
    href: "/admin/candidates",
  },
  {
    icon: BarChart3,
    label: "Analytics",
    href: "/admin/analytics",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/admin/settings",
  },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Sidebar backdrop for mobile */}
      <div
        className={`fixed inset-0 z-20 bg-white bg-opacity-50 transition-opacity lg:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`absolute left-0 top-0 z-30 flex h-screen w-72 flex-col overflow-y-hidden bg-white duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
          <Link href="/">
            <h1 className="text-2xl font-bold text-black">Desishub</h1>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="block lg:hidden text-black"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Sidebar Menu */}
        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
            <div>
              <h3 className="mb-4 ml-4 text-sm font-semibold text-black">
                MENU
              </h3>
              <ul className="mb-6 flex flex-col gap-1.5">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-black duration-300 ease-in-out hover:bg-gray dark:hover:bg-meta-4 ${
                          isActive && "bg-gray dark:bg-meta-4"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
}
