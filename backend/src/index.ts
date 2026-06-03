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
  
  // Sidebar menu endpoint - returns full menu structure
  .get('/api/config/sidebar-menu', () => [
    { icon: 'LayoutDashboard', label: 'Dashboard', path: '/dashboard' },
    { icon: 'FolderOpen', label: 'Quản lý trang', path: '/pages' },
    { icon: 'ClipboardList', label: 'Biểu mẫu', path: '/forms' },
    { icon: 'FileText', label: 'Examples', path: '/examples' },
    { icon: 'Users', label: 'Người dùng', path: '/users' },
    { icon: 'MessageSquare', label: 'Tin nhắn', path: '/messages', badge: 3 },
    { icon: 'FileText', label: 'Tài liệu', path: '/documents' },
    { icon: 'Settings', label: 'Cài đặt', path: '/settings' },
  ])
  
  // Page content endpoint - returns content for each page path
  .get('/api/config/page-content/:path', ({ params }) => {
    const pageContent: Record<string, any> = {
      '/dashboard': {
        title: 'Dashboard',
        description: 'Tổng quan hệ thống',
        widgets: [
          { type: 'stats', title: 'Tổng người dùng', value: '1,234', change: '+12.5%' },
          { type: 'stats', title: 'Doanh thu', value: '$12,345', change: '+8.2%' },
          { type: 'chart', title: 'Biểu đồ doanh thu', data: [10, 25, 30, 45, 60] },
        ],
      },
      '/pages': {
        title: 'Quản lý trang',
        description: 'Quản lý các trang trong hệ thống',
        widgets: [
          { type: 'table', title: 'Danh sách trang', columns: ['Tên', 'Path', 'Trạng thái'], data: [['Home', '/', 'Active'], ['About', '/about', 'Active']] },
        ],
      },
      '/forms': {
        title: 'Biểu mẫu',
        description: 'Quản lý biểu mẫu động',
        widgets: [
          { type: 'list', title: 'Danh sách biểu mẫu', items: ['Form đăng ký', 'Form liên hệ', 'Form khảo sát'] },
        ],
      },
      '/examples': {
        title: 'Examples',
        description: 'Ví dụ về các components UI',
        widgets: [
          { type: 'components', title: 'UI Components', items: ['Input', 'Button', 'Modal', 'Table', 'Chart'] },
        ],
      },
      '/users': {
        title: 'Người dùng',
        description: 'Quản lý người dùng',
        widgets: [
          { type: 'table', title: 'Danh sách người dùng', columns: ['Tên', 'Email', 'Vai trò'], data: [['Admin', 'admin@example.com', 'Admin'], ['User', 'user@example.com', 'User']] },
        ],
      },
      '/messages': {
        title: 'Tin nhắn',
        description: 'Quản lý tin nhắn',
        widgets: [
          { type: 'list', title: 'Tin nhắn mới', items: ['Tin nhắn 1', 'Tin nhắn 2', 'Tin nhắn 3'] },
        ],
      },
      '/documents': {
        title: 'Tài liệu',
        description: 'Quản lý tài liệu',
        widgets: [
          { type: 'list', title: 'Tài liệu gần đây', items: ['Document 1', 'Document 2', 'Document 3'] },
        ],
      },
      '/settings': {
        title: 'Cài đặt',
        description: 'Cấu hình hệ thống',
        widgets: [
          { type: 'form', title: 'Cấu hình chung', fields: ['Site name', 'Logo', 'Theme'] },
        ],
      },
    }
    
    return pageContent[params.path] || {
      title: 'Page Not Found',
      description: 'Nội dung không tồn tại',
      widgets: [],
    }
  })
  
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
