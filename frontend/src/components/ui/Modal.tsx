import { useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

interface ModalProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title?: string
  description?: string
  children: ReactNode
  footer?: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closeOnOverlay?: boolean
}

export function Modal({
  open = false,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = 'md',
  closeOnOverlay = true,
}: ModalProps) {
  const [isClosing, setIsClosing] = useState(false)

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      onOpenChange?.(false)
      setIsClosing(false)
    }, 200)
  }

  if (!open) return null

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-[95vw]',
  }

  return (
    <div className="fixed inset-0 z-modal flex items-center justify-center">
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity animate-fade-in',
          isClosing && 'animate-fade-out'
        )}
        onClick={closeOnOverlay ? handleClose : undefined}
      />

      {/* Modal Content */}
      <div
        className={cn(
          'relative z-modal w-full mx-4 rounded-xl border bg-card text-card-foreground shadow-soft animate-scale-in',
          sizeClasses[size],
          isClosing && 'animate-scale-out'
        )}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        {(title || description) && (
          <div className="flex items-start justify-between gap-4 border-b p-6">
            <div className="space-y-1.5">
              {title && (
                <h2 className="text-lg font-semibold leading-none tracking-tight">{title}</h2>
              )}
              {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
              )}
            </div>
            <button
              onClick={handleClose}
              className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        )}

        {/* Body */}
        <div className={cn('p-6', !title && !description && 'flex justify-end')}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-2 border-t bg-muted/50 p-6">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

interface ModalTriggerProps {
  children: ReactNode
  trigger?: ReactNode
  asChild?: boolean
}

export function ModalTrigger({ children, trigger, asChild }: ModalTriggerProps) {
  // This is a simplified version - in a real app you'd use context
  return <>{trigger || children}</>
}

export function ModalContent({ children }: { children: ReactNode }) {
  return <>{children}</>
}

export function ModalHeader({ title, description }: { title?: string; description?: string }) {
  return (
    <div className="space-y-1.5">
      {title && <h2 className="text-lg font-semibold">{title}</h2>}
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
    </div>
  )
}

export function ModalFooter({ children }: { children: ReactNode }) {
  return <div className="flex items-center justify-end gap-2 border-t bg-muted/50 p-6">{children}</div>
}
