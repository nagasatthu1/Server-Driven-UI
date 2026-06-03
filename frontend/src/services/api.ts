import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios'

// Configuration from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '10000', 10)

// Backend adapter pattern - allows switching backend implementations
export interface BackendAdapter {
  name: string
  transformRequest?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  transformResponse?: (response: AxiosResponse) => AxiosResponse
  handleError?: (error: AxiosError) => Promise<never>
}

// Default adapter (works with most REST APIs)
const defaultAdapter: BackendAdapter = {
  name: 'default',
  transformRequest: (config) => config,
  transformResponse: (response) => response,
  handleError: async (error) => {
    throw error
  },
}

// Node.js/Express adapter example
const nodejsAdapter: BackendAdapter = {
  name: 'nodejs',
  transformRequest: (config) => {
    // Add any Node.js specific headers or transformations
    return config
  },
}

// Python/FastAPI adapter example
const pythonAdapter: BackendAdapter = {
  name: 'python',
  transformRequest: (config) => {
    // Add any Python backend specific headers
    return config
  },
}

// Go adapter example
const goAdapter: BackendAdapter = {
  name: 'go',
  transformRequest: (config) => {
    // Add any Go backend specific headers
    return config
  },
}

// Java/Spring adapter example
const javaAdapter: BackendAdapter = {
  name: 'java',
  transformRequest: (config) => {
    // Add any Java backend specific headers
    return config
  },
}

// Adapter registry
const adapters: Record<string, BackendAdapter> = {
  default: defaultAdapter,
  nodejs: nodejsAdapter,
  python: pythonAdapter,
  go: goAdapter,
  java: javaAdapter,
}

// Get current backend type from environment
const backendType = import.meta.env.VITE_BACKEND_TYPE || 'default'
const currentAdapter = adapters[backendType] || defaultAdapter

// Create axios instance with configuration
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor with adapter support
api.interceptors.request.use(
  (config) => {
    // Apply adapter-specific request transformations
    if (currentAdapter.transformRequest) {
      return currentAdapter.transformRequest(config)
    }
    
    // Add auth token
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor with adapter support
api.interceptors.response.use(
  (response) => {
    // Apply adapter-specific response transformations
    if (currentAdapter.transformResponse) {
      return currentAdapter.transformResponse(response)
    }
    return response
  },
  async (error) => {
    // Use adapter-specific error handling if available
    if (currentAdapter.handleError) {
      return currentAdapter.handleError(error)
    }
    
    // Default error handling
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Export adapter info for debugging
export const getBackendInfo = () => ({
  type: backendType,
  adapter: currentAdapter.name,
  baseUrl: API_BASE_URL,
  timeout: API_TIMEOUT,
})

export default api
