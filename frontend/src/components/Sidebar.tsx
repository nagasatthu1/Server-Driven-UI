import { useState } from 'react'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  FileText, 
  ChevronLeft, 
  ChevronRight,
  LogOut,
  Bell,
  Search,
  Menu,
  Home,
  ClipboardList,
  MessageSquare,
  HelpCircle,
  FolderOpen
} from 'lucide-react'

interface SidebarProps {
  collapsed?: boolean
  onToggle?: () => void
  activePath?: string
  onNavigate?: (path: string) => void
}

const menuItems = [
  { icon: Home, label: 'Trang chủ', path: '/' },
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: FolderOpen, label: 'Quản lý trang', path: '/pages' },
  { icon: ClipboardList, label: 'Biểu mẫu', path: '/forms' },
  { icon: Users, label: 'Người dùng', path: '/users' },
  { icon: MessageSquare, label: 'Tin nhắn', path: '/messages', badge: 3 },
  { icon: FileText, label: 'Tài liệu', path: '/documents' },
  { icon: Settings, label: 'Cài đặt', path: '/settings' },
]

const bottomItems = [
  { icon: HelpCircle, label: 'Trợ giúp', path: '/help' },
  { icon: LogOut, label: 'Đăng xuất', path: '/logout' },
]

export default function Sidebar({ 
  collapsed = false, 
  onToggle,
  activePath = '/',
  onNavigate 
}: SidebarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

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
            <span className="text-lg font-semibold text-sidebar-foreground">Admin</span>
          </div>
        )}
        <button
          onClick={onToggle}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Search */}
      {!collapsed && (
        <div className="border-b border-sidebar-border p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sidebar-muted-foreground" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-full rounded-lg border border-sidebar-border bg-sidebar-muted px-9 py-2 text-sm text-sidebar-foreground placeholder:text-sidebar-muted-foreground focus:border-sidebar-ring focus:outline-none focus:ring-2 focus:ring-sidebar-ring"
            />
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
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
                <item.icon className="h-5 w-5 flex-shrink-0" />
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

      {/* Bottom Navigation */}
      <div className="border-t border-sidebar-border p-4">
        <ul className="space-y-1">
          {bottomItems.map((item) => (
            <li key={item.path}>
              <button
                onClick={() => onNavigate?.(item.path)}
                className={cn(
                  'group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span className="flex-1 text-left">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* User Profile */}
      {!collapsed && (
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground font-semibold">
              AD
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-sidebar-foreground">Admin User</p>
              <p className="truncate text-xs text-sidebar-muted-foreground">admin@example.com</p>
            </div>
            <button className="rounded-lg p-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
              <Bell size={18} />
            </button>
          </div>
        </div>
      )}
    </aside>
  )
}
