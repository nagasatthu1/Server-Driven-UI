import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { configService } from '@/services/configService'
import type { LayoutConfig, SidebarMenuItem } from '@/types/layout'

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
      localStorage.setItem('page-layout', JSON.stringify(layout))
      return layout
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['layout-config'] })
    },
  })
}
