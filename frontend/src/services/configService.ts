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

export const configService = {
  async getUIConfig(): Promise<UIConfig> {
    const response = await api.get('/config/ui')
    return response.data
  },

  async getPageConfig(pageId: string): Promise<Record<string, unknown>> {
    const response = await api.get(`/config/pages/${pageId}`)
    return response.data
  },
}
