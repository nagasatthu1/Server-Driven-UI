import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import type { UIConfig } from '@/services/configService'

interface DynamicLayoutProps {
  config: UIConfig
  children: ReactNode
}

export default function DynamicLayout({ config, children }: DynamicLayoutProps) {
  const { theme, branding, navigation } = config

  return (
    <div className={cn('min-h-screen bg-background', theme.darkMode && 'dark')}>
      {/* Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            {branding.logoUrl && (
              <img src={branding.logoUrl} alt={branding.appName} className="h-8 w-auto" />
            )}
            <span className="text-xl font-bold">{branding.appName}</span>
          </div>
          {/* Navigation */}
          <nav className="flex items-center gap-4">
            {navigation.items.map((item, index) => (
              <a
                key={index}
                href={item.path}
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6">{children}</main>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {branding.appName}. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
