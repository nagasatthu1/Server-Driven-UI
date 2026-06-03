import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import { useSidebarMenu } from '@/hooks/useConfig'

export default function ExamplesPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { data: menuItems } = useSidebarMenu()

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar
        items={menuItems || []}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activePath="/examples"
      />

      {/* Main Content */}
      <main
        className={`transition-all duration-300 ${
          sidebarCollapsed ? 'ml-sidebar-collapsed' : 'ml-sidebar'
        }`}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">Ví dụ Components</h1>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="container py-8 space-y-12">
          {/* Form Inputs Section */}
          <section className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Nhập liệu cơ bản</h2>
              <p className="text-muted-foreground">
                Các thành phần nhập liệu thông dụng
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Text Input with Icon */}
              <div className="space-y-4 p-6 rounded-lg border bg-card">
                <h3 className="font-medium">Input với icon</h3>
                <input
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Nhập tên..."
                />
                <input
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="email@example.com"
                  type="email"
                />
              </div>

              {/* Buttons */}
              <div className="space-y-4 p-6 rounded-lg border bg-card">
                <h3 className="font-medium">Buttons</h3>
                <div className="flex flex-wrap gap-2">
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
                    Primary
                  </button>
                  <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md">
                    Secondary
                  </button>
                  <button className="px-4 py-2 border rounded-md">
                    Outline
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
