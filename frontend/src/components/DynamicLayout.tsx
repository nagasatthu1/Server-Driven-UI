import { useState, ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import Sidebar from '@/components/Sidebar'
import type { UIConfig } from '@/services/configService'
import type { SidebarMenuItem } from '@/types/layout'
import { useSidebarConfig } from '@/hooks/useConfig'

interface DynamicLayoutProps {
  config: UIConfig
  sidebarItems?: SidebarMenuItem[]
  children: ReactNode
}

export default function DynamicLayout({
  config,
  sidebarItems = [],
  children,
}: DynamicLayoutProps) {
  const { theme, branding } = config
  const location = useLocation()
  
  // Use hook to get sidebar config for current page (if using React Query)
  const { data: sidebarConfig, isLoading } = useSidebarConfig(location.pathname)
  
  const items = sidebarConfig?.sidebarItems || sidebarItems
  const collapsed = sidebarConfig?.collapsed || false
  const enabled = sidebarConfig?.enabled !== false
  
  const [isCollapsed, setIsCollapsed] = useState(collapsed)

  if (isLoading) {
    return <div>Loading layout...</div>
  }

  return (
    <div className={cn('min-h-screen bg-background', theme.darkMode && 'dark')}>
      {/* Sidebar - mặc định là sidebar dọc */}
      {enabled && (
        <Sidebar
          items={items}
          collapsed={isCollapsed}
          onToggle={() => setIsCollapsed(!isCollapsed)}
          activePath={location.pathname}
          onNavigate={(path) => {
            window.location.href = path
          }}
        />
      )}
      
      {/* Main Content - có margin-left để tránh sidebar */}
      <main 
        className={cn(
          'transition-all duration-300 ease-in-out py-6',
          enabled ? (isCollapsed ? 'ml-sidebar-collapsed' : 'ml-sidebar') : ''
        )}
      >
        <div className="container">{children}</div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {branding.appName}. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
