import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { configService, type UIConfig } from '@/services/configService'
import type { LayoutConfig, PageSidebarConfig, SidebarMenuItem } from '@/types/layout'

export function useUIConfig() {
  return useQuery<UIConfig>({
    queryKey: ['ui-config'],
    queryFn: () => configService.getUIConfig(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function usePageConfig(pageId: string) {
  return useQuery({
    queryKey: ['page-config', pageId],
    queryFn: () => configService.getPageConfig(pageId),
    enabled: !!pageId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export function useLayoutConfig() {
  const queryClient = useQueryClient()

  return useQuery<LayoutConfig>({
    queryKey: ['layout-config'],
    queryFn: async () => {
      const response = await configService.getPageConfig('layout')
      return response as LayoutConfig
    },
    staleTime: 5 * 60 * 1000,
  })
}

/**
 * Hook để lấy cấu hình sidebar cho trang hiện tại
 * @param currentPagePath - Path của trang hiện tại
 */
export function useSidebarConfig(currentPagePath: string) {
  return useQuery<PageSidebarConfig>({
    queryKey: ['sidebar-config', currentPagePath],
    queryFn: async () => {
      const response = await configService.getSidebarConfig(currentPagePath)
      return response as PageSidebarConfig
    },
    enabled: !!currentPagePath,
    staleTime: 5 * 60 * 1000,
  })
}

/**
 * Hook để lấy danh sách menu sidebar từ API
 */
export function useSidebarMenu() {
  return useQuery<SidebarMenuItem[]>({
    queryKey: ['sidebar-menu'],
    queryFn: () => configService.getSidebarMenu(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useSaveLayout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (layout: LayoutConfig) => {
      // In production, this would call the backend API
      // For now, save to localStorage as fallback
      localStorage.setItem('page-layout', JSON.stringify(layout))
      return layout
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['layout-config'] })
    },
  })
}
