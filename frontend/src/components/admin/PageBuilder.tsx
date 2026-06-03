import { useState } from 'react'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { Plus, Save, RotateCcw } from 'lucide-react'
import { usePageBuilder } from '@/hooks/usePageBuilder'
import { WidgetList } from './WidgetList'
import type { WidgetConfig } from '@/types/layout'
import { defaultWidgetTypes, widgetDefaultConfigs } from '@/types/layout'
import { cn } from '@/lib/utils'

// Helper function for array reordering
function arrayMove<T>(array: T[], from: number, to: number): T[] {
  const newArray = array.slice()
  const [movedItem] = newArray.splice(from, 1)
  newArray.splice(to, 0, movedItem)
  return newArray
}

export default function PageBuilder() {
  const {
    pages,
    currentPage,
    currentPageId,
    addPage,
    updatePage,
    deletePage,
    setCurrentPage,
    addWidget,
    removeWidget,
    updateWidget,
    reorderWidgets,
    toggleWidgetVisibility,
  } = usePageBuilder()

  const [isEditingPage, setIsEditingPage] = useState(false)
  const [editingWidget, setEditingWidget] = useState<WidgetConfig | null>(null)

  // Initialize with a default page if none exists
  useState(() => {
    if (pages.length === 0) {
      addPage({
        name: 'Home Page',
        path: '/',
        enabled: true,
        layout: 'grid',
        metadata: {
          description: 'Default home page',
          icon: 'home',
          order: 1,
        },
      })
    }
  })

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || !currentPage) return

    if (active.id !== over.id && currentPageId) {
      const items = currentPage.widgets.map((w) => w.id)
      const oldIndex = items.indexOf(active.id as string)
      const newIndex = items.indexOf(over.id as string)
      const newOrder = arrayMove(items, oldIndex, newIndex)
      reorderWidgets(currentPageId, newOrder)
    }
  }

  const handleAddWidget = (type: WidgetConfig['type']) => {
    if (!currentPage) return

    addWidget(currentPage.id, {
      type,
      title: `New ${type} Widget`,
      visible: true,
      position: currentPage.widgets.length,
      config: widgetDefaultConfigs[type] || {},
    })
  }

  const handleSaveLayout = () => {
    // Save layout to backend or localStorage
    console.log('Saving layout:', pages)
    localStorage.setItem('page-layout', JSON.stringify(pages))
  }

  const handleResetLayout = () => {
    if (confirm('Are you sure you want to reset the layout?')) {
      const saved = localStorage.getItem('page-layout')
      if (saved) {
        // Reset to saved layout
      }
    }
  }

  if (!currentPage) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">No pages created yet</h2>
          <button
            onClick={() =>
              addPage({
                name: 'New Page',
                path: '/new-page',
                enabled: true,
                layout: 'grid',
              })
            }
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Create Your First Page
          </button>
        </div>
      </div>
    )
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex h-full">
        {/* Left Sidebar - Page List */}
        <aside className="w-64 border-r p-4 bg-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Pages</h2>
            <button
              onClick={() =>
                addPage({
                  name: 'New Page',
                  path: `/page-${pages.length + 1}`,
                  enabled: true,
                  layout: 'grid',
                })
              }
              className="p-1.5 rounded hover:bg-accent"
              title="Add page"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-2">
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => setCurrentPage(page.id)}
                className={cn(
                  'w-full text-left px-3 py-2 rounded-md text-sm transition-colors',
                  currentPageId === page.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="truncate">{page.name}</span>
                  {!page.enabled && (
                    <span className="text-xs opacity-60">(Hidden)</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content - Widget Builder */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold">{currentPage.name}</h1>
                <p className="text-sm text-muted-foreground">
                  Path: {currentPage.path}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditingPage(true)}
                  className="px-3 py-2 text-sm border rounded-md hover:bg-accent"
                >
                  Edit Page
                </button>
                <button
                  onClick={handleResetLayout}
                  className="p-2 border rounded-md hover:bg-accent"
                  title="Reset layout"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
                <button
                  onClick={handleSaveLayout}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                  <Save className="h-4 w-4" />
                  Save Layout
                </button>
              </div>
            </div>

            {/* Widget Toolbar */}
            <div className="mb-6 p-4 border rounded-lg bg-card">
              <h3 className="text-sm font-medium mb-3">Add Widgets</h3>
              <div className="flex flex-wrap gap-2">
                {defaultWidgetTypes.map((widgetType) => (
                  <button
                    key={widgetType.type}
                    onClick={() => handleAddWidget(widgetType.type)}
                    className="px-3 py-2 text-sm border rounded-md hover:bg-accent transition-colors"
                  >
                    + {widgetType.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Widget List with Drag & Drop */}
            <WidgetList
              widgets={currentPage.widgets}
              onReorder={(widgetIds) =>
                currentPageId && reorderWidgets(currentPageId, widgetIds)
              }
              onToggleVisibility={(widgetId) =>
                currentPageId && toggleWidgetVisibility(currentPageId, widgetId)
              }
              onRemove={(widgetId) =>
                currentPageId && removeWidget(currentPageId, widgetId)
              }
              onEdit={(widget) => setEditingWidget(widget)}
            />
          </div>
        </main>

        {/* Right Sidebar - Widget Properties */}
        {editingWidget && (
          <aside className="w-80 border-l p-4 bg-card overflow-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Edit Widget</h2>
              <button
                onClick={() => setEditingWidget(null)}
                className="p-1.5 rounded hover:bg-accent"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={editingWidget.title}
                  onChange={(e) =>
                    currentPageId &&
                    updateWidget(currentPageId, editingWidget.id, {
                      title: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select
                  value={editingWidget.type}
                  disabled
                  className="w-full px-3 py-2 border rounded-md bg-muted"
                >
                  {defaultWidgetTypes.map((t) => (
                    <option key={t.type} value={t.type}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-2">Widget Config</h3>
                <pre className="text-xs bg-muted p-3 rounded-md overflow-auto">
                  {JSON.stringify(editingWidget.config, null, 2)}
                </pre>
              </div>

              <div className="pt-4 border-t">
                <button
                  onClick={() =>
                    currentPageId &&
                    removeWidget(currentPageId, editingWidget.id)
                  }
                  className="w-full px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90"
                >
                  Delete Widget
                </button>
              </div>
            </div>
          </aside>
        )}
      </div>
    </DndContext>
  )
}
