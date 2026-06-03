import { useState, useEffect } from 'react'
import { useLayoutConfig, useSaveLayout } from '@/hooks/useConfig'
import PageBuilder from '@/components/admin/PageBuilder'
import type { LayoutConfig } from '@/types/layout'
import { Loader2 } from 'lucide-react'

export default function AdminLayout() {
  const [isClient, setIsClient] = useState(false)
  const { data: layoutConfig, isLoading, error } = useLayoutConfig()
  const saveLayout = useSaveLayout()

  useEffect(() => {
    setIsClient(true)

    // Load saved layout from localStorage on mount
    const savedLayout = localStorage.getItem('page-layout')
    if (savedLayout && !layoutConfig) {
      try {
        const parsed = JSON.parse(savedLayout) as LayoutConfig
        console.log('Loaded saved layout from localStorage')
      } catch (e) {
        console.error('Failed to parse saved layout:', e)
      }
    }
  }, [])

  const handleSave = (layout: LayoutConfig) => {
    saveLayout.mutate(layout)
  }

  if (!isClient || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center text-destructive">
          <p>Error loading layout configuration</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="border-b bg-card">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">Admin Panel</h1>
            <nav className="flex items-center gap-4 text-sm">
              <a href="/admin/pages" className="hover:text-primary">
                Pages
              </a>
              <a href="/admin/widgets" className="hover:text-primary">
                Widgets
              </a>
              <a href="/admin/settings" className="hover:text-primary">
                Settings
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {saveLayout.isPending ? 'Saving...' : 'Ready'}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6">
        <PageBuilder />
      </main>
    </div>
  )
}
