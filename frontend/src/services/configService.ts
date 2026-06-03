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
      { label: 'Home', path: '/' },
      { label: 'Dashboard', path: '/dashboard' },
      { label: 'Settings', path: '/settings' },
    ],
  },
  branding: {
    logoUrl: '/logo.svg',
    appName: 'My App',
  },
}

// Mock sidebar menu data
const mockSidebarMenu: SidebarMenuItem[] = [
  { icon: 'Home', label: 'Trang chủ', path: '/' },
  { icon: 'LayoutDashboard', label: 'Dashboard', path: '/dashboard' },
  { icon: 'FolderOpen', label: 'Quản lý trang', path: '/pages' },
  { icon: 'ClipboardList', label: 'Biểu mẫu', path: '/forms' },
  { icon: 'Users', label: 'Người dùng', path: '/users' },
  { icon: 'MessageSquare', label: 'Tin nhắn', path: '/messages', badge: 3 },
  { icon: 'FileText', label: 'Tài liệu', path: '/documents' },
  { icon: 'Settings', label: 'Cài đặt', path: '/settings' },
]

// Mock sidebar config for different pages
const mockPageSidebarConfigs: Record<string, PageSidebarConfigResponse> = {
  '/': {
    pageId: 'home',
    path: '/',
    sidebarItems: mockSidebarMenu,
    collapsed: false,
    enabled: true,
  },
  '/dashboard': {
    pageId: 'dashboard',
    path: '/dashboard',
    sidebarItems: mockSidebarMenu,
    collapsed: false,
    enabled: true,
  },
  '/pages': {
    pageId: 'pages',
    path: '/pages',
    sidebarItems: mockSidebarMenu,
    collapsed: false,
    enabled: true,
  },
}

export const configService = {
  /**
   * Get UI configuration from backend
   * Falls back to mock data if backend is unavailable
   */
  async getUIConfig(): Promise<UIConfig> {
    const enableMock = import.meta.env.VITE_ENABLE_MOCK_API === 'true'

    // Return mock data if mock API is enabled
    if (enableMock) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockUIConfig), 100)
      })
    }

    try {
      const response = await api.get('/config/ui')
      return response.data
    } catch (error) {
      // If backend is unavailable, fall back to mock data
      console.warn('Backend unavailable, using mock configuration:', error)
      return mockUIConfig
    }
  },

  /**
   * Get page-specific configuration
   * Falls back to empty config if backend is unavailable
   */
  async getPageConfig(pageId: string): Promise<Record<string, unknown>> {
    const enableMock = import.meta.env.VITE_ENABLE_MOCK_API === 'true'

    // Return mock data if mock API is enabled
    if (enableMock) {
      return new Promise((resolve) => {
        setTimeout(() => resolve({ pageId, title: `Page ${pageId}` }), 100)
      })
    }

    try {
      const response = await api.get(`/config/pages/${pageId}`)
      return response.data
    } catch (error) {
      // If backend is unavailable, return empty config
      console.warn(
        `Backend unavailable for page ${pageId}, using empty config:`,
        error
      )
      return { pageId, title: `Page ${pageId}` }
    }
  },

  /**
   * Get sidebar configuration for a specific page
   * Returns sidebar items, collapsed state, and enabled state for the page
   */
  async getSidebarConfig(pagePath: string): Promise<PageSidebarConfigResponse> {
    const enableMock = import.meta.env.VITE_ENABLE_MOCK_API === 'true'

    // Return mock data if mock API is enabled
    if (enableMock) {
      return new Promise((resolve) => {
        const config = mockPageSidebarConfigs[pagePath] || {
          pageId: 'default',
          path: pagePath,
          sidebarItems: mockSidebarMenu,
          collapsed: false,
          enabled: true,
        }
        setTimeout(() => resolve(config), 100)
      })
    }

    try {
      const response = await api.get(`/config/sidebar/${encodeURIComponent(pagePath)}`)
      return response.data
    } catch (error) {
      // If backend is unavailable, return default sidebar config
      console.warn(
        `Backend unavailable for sidebar config at ${pagePath}, using default:`,
        error
      )
      return {
        pageId: 'default',
        path: pagePath,
        sidebarItems: mockSidebarMenu,
        collapsed: false,
        enabled: true,
      }
    }
  },

  /**
   * Get sidebar menu items from backend
   * This returns the full menu structure that can be filtered per page
   */
  async getSidebarMenu(): Promise<SidebarMenuItem[]> {
    const enableMock = import.meta.env.VITE_ENABLE_MOCK_API === 'true'

    // Return mock data if mock API is enabled
    if (enableMock) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockSidebarMenu), 100)
      })
    }

    try {
      const response = await api.get('/config/sidebar-menu')
      return response.data
    } catch (error) {
      // If backend is unavailable, return mock menu
      console.warn('Backend unavailable for sidebar menu, using mock:', error)
      return mockSidebarMenu
    }
  },
}
