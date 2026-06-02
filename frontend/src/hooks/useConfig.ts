import { useQuery } from '@tanstack/react-query'
import { configService, type UIConfig } from '@/services/configService'

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
