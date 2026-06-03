import api from './api'
import type { SidebarMenuItem } from '@/types/layout'

export interface UIConfig {
  theme: {
    primaryColor: string
    darkMode: boolean
  }
  features: {
    [key: string]: boolean
  }
  navigation: {
    items: Array<{
      label: string
      path: string
      icon?: string
      children?: Array<{ label: string; path: string }>
    }>
  }
  branding: {
    logoUrl: string
    appName: string
  }
}

export interface PageSidebarConfigResponse {
  pageId: string
  path: string
  sidebarItems: SidebarMenuItem[]
  collapsed?: boolean
  enabled?: boolean
}

// Mock data for development/testing or when backend is unavailable
const mockUIConfig: UIConfig = {
  theme: {
    primaryColor: '#3b82f6',
    darkMode: false,
  },
  features: {
    enableDashboard: true,
    enableAnalytics: true,
    enableNotifications: true,
  },
  navigation: {
    items: [
      { label: 'Dashboard', path: '/dashboard' },
      { label: 'Settings', path: '/settings' },
    ],
  },
  branding: {
    logoUrl: '/logo.svg',
    appName: 'ServerDrivenUIApp',
  },
}

export const configService = {
  async getUIConfig(): Promise<UIConfig> {
    try {
      const response = await api.get('/config/ui')
      return response.data
    } catch (error) {
      // If backend is unavailable, fall back to mock data
      console.warn('Backend unavailable, using mock configuration:', error)
      return mockUIConfig
    }
  },

  async getPageConfig(pageId: string): Promise<Record<string, unknown>> {
    try {
      const response = await api.get(`/config/pages/${pageId}`)
      return response.data
    } catch (error) {
      console.warn(
        `Backend unavailable for page ${pageId}, using empty config:`,
        error
      )
      return { pageId, title: `Page ${pageId}` }
    }
  },

  async getSidebarMenu(): Promise<SidebarMenuItem[]> {
    try {
      const response = await api.get('/config/sidebar-menu')
      return response.data
    } catch (error) {
      console.warn('Backend unavailable for sidebar menu: ', error)
      return []
    }
  },
}
