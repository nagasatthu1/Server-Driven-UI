import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import { useSidebarMenu } from '@/hooks/useConfig'

export default function DashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { data: menuItems, isLoading } = useSidebarMenu()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        items={menuItems || []}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activePath="/dashboard"
      />
      <main
        className={`transition-all duration-300 ${
          sidebarCollapsed ? 'ml-sidebar-collapsed' : 'ml-sidebar'
        }`}
      >
        <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>
        </header>
        <div className="container py-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-lg font-semibold">Tổng người dùng</h3>
              <p className="text-3xl font-bold mt-2">1,234</p>
              <p className="text-sm text-success mt-1">+12.5% so với tháng trước</p>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-lg font-semibold">Doanh thu</h3>
              <p className="text-3xl font-bold mt-2">$12,345</p>
              <p className="text-sm text-success mt-1">+8.2% so với tháng trước</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
