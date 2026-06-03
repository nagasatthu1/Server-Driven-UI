import { useState, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import type { PageConfig, WidgetConfig } from '../types/layout'

export interface PageBuilderState {
  pages: PageConfig[]
  currentPageId: string | null
}

export function usePageBuilder() {
  const [state, setState] = useState<PageBuilderState>({
    pages: [],
    currentPageId: null,
  })

  // Add a new page
  const addPage = useCallback((page: Omit<PageConfig, 'id' | 'widgets'>) => {
    const newPage: PageConfig = {
      ...page,
      id: uuidv4(),
      widgets: [],
    }
    setState((prev) => ({
      ...prev,
      pages: [...prev.pages, newPage],
      currentPageId: newPage.id,
    }))
    return newPage
  }, [])

  // Delete a page
  const deletePage = useCallback((pageId: string) => {
    setState((prev) => {
      const newPages = prev.pages.filter((p) => p.id !== pageId)
      return {
        pages: newPages,
        currentPageId:
          prev.currentPageId === pageId
            ? newPages.length > 0
              ? newPages[0].id
              : null
            : prev.currentPageId,
      }
    })
  }, [])

  // Update page
  const updatePage = useCallback(
    (pageId: string, updates: Partial<PageConfig>) => {
      setState((prev) => ({
        ...prev,
        pages: prev.pages.map((p) =>
          p.id === pageId ? { ...p, ...updates } : p
        ),
      }))
    },
    []
  )

  // Set current page
  const setCurrentPage = useCallback((pageId: string | null) => {
    setState((prev) => ({ ...prev, currentPageId: pageId }))
  }, [])

  // Add widget to page
  const addWidget = useCallback(
    (pageId: string, widget: Omit<WidgetConfig, 'id'>) => {
      const newWidget: WidgetConfig = {
        ...widget,
        id: uuidv4(),
      }
      setState((prev) => ({
        ...prev,
        pages: prev.pages.map((p) =>
          p.id === pageId ? { ...p, widgets: [...p.widgets, newWidget] } : p
        ),
      }))
      return newWidget
    },
    []
  )

  // Remove widget from page
  const removeWidget = useCallback((pageId: string, widgetId: string) => {
    setState((prev) => ({
      ...prev,
      pages: prev.pages.map((p) =>
        p.id === pageId
          ? { ...p, widgets: p.widgets.filter((w) => w.id !== widgetId) }
          : p
      ),
    }))
  }, [])

  // Update widget
  const updateWidget = useCallback(
    (pageId: string, widgetId: string, updates: Partial<WidgetConfig>) => {
      setState((prev) => ({
        ...prev,
        pages: prev.pages.map((p) =>
          p.id === pageId
            ? {
                ...p,
                widgets: p.widgets.map((w) =>
                  w.id === widgetId ? { ...w, ...updates } : w
                ),
              }
            : p
        ),
      }))
    },
    []
  )

  // Reorder widgets in a page
  const reorderWidgets = useCallback((pageId: string, widgetIds: string[]) => {
    setState((prev) => ({
      ...prev,
      pages: prev.pages.map((p) => {
        if (p.id !== pageId) return p

        // Create a map of widgets by ID for quick lookup
        const widgetMap = new Map(p.widgets.map((w) => [w.id, w]))

        // Rebuild widgets array in the new order
        const reorderedWidgets = widgetIds
          .map((id) => widgetMap.get(id))
          .filter((w): w is WidgetConfig => w !== undefined)

        return { ...p, widgets: reorderedWidgets }
      }),
    }))
  }, [])

  // Toggle widget visibility
  const toggleWidgetVisibility = useCallback(
    (pageId: string, widgetId: string) => {
      setState((prev) => ({
        ...prev,
        pages: prev.pages.map((p) =>
          p.id === pageId
            ? {
                ...p,
                widgets: p.widgets.map((w) =>
                  w.id === widgetId ? { ...w, visible: !w.visible } : w
                ),
              }
            : p
        ),
      }))
    },
    []
  )

  // Get current page
  const currentPage =
    state.pages.find((p) => p.id === state.currentPageId) || null

  return {
    ...state,
    currentPage,
    addPage,
    deletePage,
    updatePage,
    setCurrentPage,
    addWidget,
    removeWidget,
    updateWidget,
    reorderWidgets,
    toggleWidgetVisibility,
  }
}
