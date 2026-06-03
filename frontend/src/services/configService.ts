import api from './api'

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
}
