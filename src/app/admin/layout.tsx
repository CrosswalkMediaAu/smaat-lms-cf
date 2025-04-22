"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, FileText, LayoutDashboard, Settings, Users } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden w-64 flex-col border-r bg-muted/40 md:flex">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/admin" className="flex items-center gap-2 font-semibold">
            <LayoutDashboard className="h-5 w-5" />
            <span>Admin Dashboard</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium">
            <Link
              href="/admin"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                isActive("/admin") ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/admin/courses"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                pathname.startsWith("/admin/courses")
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <BookOpen className="h-4 w-4" />
              Courses
            </Link>
            <Link
              href="/admin/users"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                pathname.startsWith("/admin/users")
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <Users className="h-4 w-4" />
              Users
            </Link>
            <Link
              href="/admin/tests"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                pathname.startsWith("/admin/tests")
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <FileText className="h-4 w-4" />
              Tests & Results
            </Link>
            <Link
              href="/admin/settings"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                pathname.startsWith("/admin/settings")
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  )
}
