import { Elysia, t } from 'elysia'
import { cors } from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'

const app = new Elysia()
  .use(cors())
  .use(
    swagger({
      path: '/docs',
      documentation: {
        info: {
          title: 'Dynamic Config API',
          version: '1.0.0',
        },
      },
    })
  )
  // Health check
  .get('/health', () => ({ status: 'ok', timestamp: new Date().toISOString() }))
  
  // UI Configuration endpoint
  .get('/api/config/ui', () => ({
    theme: {
      primaryColor: '#007bff',
      darkMode: false,
    },
    features: {
      dashboard: true,
      analytics: true,
      settings: true,
      users: false,
    },
    navigation: {
      items: [
        { label: 'Home', path: '/' },
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Analytics', path: '/analytics' },
        { label: 'Settings', path: '/settings' },
      ],
    },
    branding: {
      logoUrl: '/logo.svg',
      appName: 'Dynamic App',
    },
  }))
  
  // Page configuration endpoint
  .get('/api/config/pages/:pageId', ({ params }) => ({
    pageId: params.pageId,
    layout: 'default',
    components: [
      { type: 'header', title: `Page: ${params.pageId}` },
      { type: 'content', body: 'Dynamic content loaded from backend' },
    ],
  }))
  
  // Auth endpoints
  .post('/api/auth/login', ({ body }) => {
    // Mock login - replace with real auth logic
    const { email, password } = body
    if (email === 'admin@example.com' && password === 'admin123') {
      return {
        success: true,
        token: 'mock-jwt-token-' + Date.now(),
        user: { id: 1, email, role: 'admin' },
      }
    }
    return { success: false, message: 'Invalid credentials' }
  }, {
    body: t.Object({
      email: t.String(),
      password: t.String(),
    }),
  })
  
  .listen(8080)

console.log('🦊 Server running at http://localhost:8080')
console.log('📚 API Docs available at http://localhost:8080/docs')
