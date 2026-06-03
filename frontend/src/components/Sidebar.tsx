import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { SidebarMenuItem } from '@/types/layout'

// Map icon names to components (lazy load or import as needed)
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {}

interface SidebarProps {
  items: SidebarMenuItem[]
  collapsed?: boolean
  onToggle?: () => void
  activePath?: string
  onNavigate?: (path: string) => void
}

export default function Sidebar({
  items = [],
  collapsed = false,
  onToggle,
  activePath = '/',
  onNavigate,
}: SidebarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  // Get icon component by name
  const getIconComponent = (iconName?: string) => {
    if (!iconName) return null
    const IconComponent = iconMap[iconName]
    return IconComponent ? (
      <IconComponent className="h-5 w-5 flex-shrink-0" />
    ) : null
  }

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out border-r sidebar-border bg-sidebar',
        collapsed ? 'w-sidebar-collapsed' : 'w-sidebar'
      )}
    >
      {/* Sidebar Header */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground font-bold">
              A
            </div>
            <span className="text-lg font-semibold text-sidebar-foreground">
              Admin
            </span>
          </div>
        )}
        <button
          onClick={onToggle}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
        >
          {collapsed ? (
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          ) : (
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.path}>
              <button
                onClick={() => onNavigate?.(item.path)}
                onMouseEnter={() => setHoveredItem(item.path)}
                onMouseLeave={() => setHoveredItem(null)}
                className={cn(
                  'group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  activePath === item.path
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                )}
              >
                {getIconComponent(item.icon)}
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-sidebar-primary px-1 text-xs text-sidebar-primary-foreground">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
                {collapsed && hoveredItem === item.path && (
                  <div className="absolute left-full ml-2 hidden whitespace-nowrap rounded-md bg-sidebar-popover px-3 py-2 text-sm text-sidebar-popover-foreground shadow-lg group-hover:block">
                    {item.label}
                  </div>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
