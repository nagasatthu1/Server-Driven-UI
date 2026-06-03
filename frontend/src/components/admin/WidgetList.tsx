import { useDndContext, type UniqueIdentifier } from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Eye, EyeOff, Trash2, Settings } from 'lucide-react'
import type { WidgetConfig } from '@/types/layout'
import { cn } from '@/lib/utils'

interface WidgetItemProps {
  widget: WidgetConfig
  onToggleVisibility: (widgetId: string) => void
  onRemove: (widgetId: string) => void
  onEdit: (widget: WidgetConfig) => void
}

export function WidgetItem({
  widget,
  onToggleVisibility,
  onRemove,
  onEdit,
}: WidgetItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: widget.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'relative flex items-center gap-3 p-4 bg-card border rounded-lg mb-3',
        !widget.visible && 'opacity-60 bg-muted',
        isDragging && 'ring-2 ring-primary'
      )}
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing p-1 hover:bg-accent rounded"
      >
        <GripVertical className="h-5 w-5 text-muted-foreground" />
      </div>

      {/* Widget Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium truncate">{widget.title}</span>
          <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
            {widget.type}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Position: {widget.position + 1}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onToggleVisibility(widget.id)}
          className={cn(
            'p-2 rounded hover:bg-accent transition-colors',
            !widget.visible && 'text-muted-foreground'
          )}
          title={widget.visible ? 'Hide widget' : 'Show widget'}
        >
          {widget.visible ? (
            <Eye className="h-4 w-4" />
          ) : (
            <EyeOff className="h-4 w-4" />
          )}
        </button>

        <button
          onClick={() => onEdit(widget)}
          className="p-2 rounded hover:bg-accent transition-colors"
          title="Edit widget"
        >
          <Settings className="h-4 w-4" />
        </button>

        <button
          onClick={() => onRemove(widget.id)}
          className="p-2 rounded hover:bg-destructive/10 text-destructive transition-colors"
          title="Remove widget"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

interface WidgetListProps {
  widgets: WidgetConfig[]
  onReorder: (widgetIds: string[]) => void
  onToggleVisibility: (widgetId: string) => void
  onRemove: (widgetId: string) => void
  onEdit: (widget: WidgetConfig) => void
}

export function WidgetList({
  widgets,
  onReorder,
  onToggleVisibility,
  onRemove,
  onEdit,
}: WidgetListProps) {
  const dndContext = useDndContext()

  // Handle drag end
  if (dndContext.active?.id) {
    dndContext.over?.id &&
      onReorder(
        arrayMove(
          widgets.map((w) => w.id),
          widgets.findIndex((w) => w.id === dndContext.active?.id),
          widgets.findIndex((w) => w.id === dndContext.over?.id)
        )
      )
  }

  const visibleWidgets = widgets.filter((w) => w.visible)
  const hiddenWidgets = widgets.filter((w) => !w.visible)

  return (
    <div className="space-y-4">
      {/* Visible Widgets */}
      {visibleWidgets.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-3 text-muted-foreground">
            Visible Widgets
          </h3>
          <SortableContext
            items={visibleWidgets.map((w) => w.id)}
            strategy={verticalListSortingStrategy}
          >
            {visibleWidgets.map((widget) => (
              <WidgetItem
                key={widget.id}
                widget={widget}
                onToggleVisibility={onToggleVisibility}
                onRemove={onRemove}
                onEdit={onEdit}
              />
            ))}
          </SortableContext>
        </div>
      )}

      {/* Hidden Widgets */}
      {hiddenWidgets.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-3 text-muted-foreground">
            Hidden Widgets
          </h3>
          <SortableContext
            items={hiddenWidgets.map((w) => w.id)}
            strategy={verticalListSortingStrategy}
          >
            {hiddenWidgets.map((widget) => (
              <WidgetItem
                key={widget.id}
                widget={widget}
                onToggleVisibility={onToggleVisibility}
                onRemove={onRemove}
                onEdit={onEdit}
              />
            ))}
          </SortableContext>
        </div>
      )}

      {widgets.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No widgets yet. Add widgets to build your page.</p>
        </div>
      )}
    </div>
  )
}
