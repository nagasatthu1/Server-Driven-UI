import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Sidebar from '@/components/Sidebar'
import { useSidebarMenu } from '@/hooks/useConfig'
import api from '@/services/api'

interface PageContent {
  title: string
  description: string
  widgets: Array<{
    type: string
    title: string
    [key: string]: any
  }>
}

export default function GenericPage() {
  const { path = 'dashboard' } = useParams<{ path: string }>()
  const navigate = useNavigate()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { data: menuItems } = useSidebarMenu()
  const [content, setContent] = useState<PageContent | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const normalizedPath = `/${path}`

  useEffect(() => {
    async function fetchPageContent() {
      setIsLoading(true)
      try {
        const response = await api.get(`/config/page-content${normalizedPath}`)
        setContent(response.data)
      } catch (error) {
        console.error('Error fetching page content:', error)
        setContent({
          title: 'Error',
          description: 'Không thể tải nội dung trang',
          widgets: [],
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchPageContent()
  }, [normalizedPath])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div>Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        items={menuItems || []}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activePath={normalizedPath}
        onNavigate={(p) => navigate(p)}
      />
      <main
        className={`transition-all duration-300 ${
          sidebarCollapsed ? 'ml-sidebar-collapsed' : 'ml-sidebar'
        }`}
      >
        <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{content?.title || 'Page'}</h1>
              <p className="text-sm text-muted-foreground">{content?.description}</p>
            </div>
          </div>
        </header>
        <div className="container py-8">
          {content?.widgets && content.widgets.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {content.widgets.map((widget, index) => (
                <div key={index} className="rounded-lg border bg-card p-6">
                  <h3 className="text-lg font-semibold mb-4">{widget.title}</h3>
                  {widget.type === 'stats' && (
                    <>
                      <p className="text-3xl font-bold">{widget.value}</p>
                      {widget.change && (
                        <p className="text-sm text-success mt-1">{widget.change}</p>
                      )}
                    </>
                  )}
                  {widget.type === 'list' && widget.items && (
                    <ul className="space-y-2">
                      {widget.items.map((item: string, i: number) => (
                        <li key={i} className="text-sm">{item}</li>
                      ))}
                    </ul>
                  )}
                  {widget.type === 'table' && widget.columns && widget.data && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            {widget.columns.map((col: string, i: number) => (
                              <th key={i} className="text-left p-2">{col}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {widget.data.map((row: string[], ri: number) => (
                            <tr key={ri} className="border-b">
                              {row.map((cell, ci) => (
                                <td key={ci} className="p-2">{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  {widget.type === 'components' && widget.items && (
                    <div className="flex flex-wrap gap-2">
                      {widget.items.map((item: string, i: number) => (
                        <span key={i} className="px-3 py-1 bg-primary/10 rounded-full text-sm">
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                  {widget.type === 'form' && widget.fields && (
                    <div className="space-y-4">
                      {widget.fields.map((field: string, i: number) => (
                        <div key={i} className="text-sm">
                          <label className="font-medium">{field}</label>
                        </div>
                      ))}
                    </div>
                  )}
                  {widget.type === 'chart' && (
                    <div className="h-40 flex items-end gap-2">
                      {widget.data && widget.data.map((value: number, i: number) => (
                        <div
                          key={i}
                          className="flex-1 bg-primary rounded-t"
                          style={{ height: `${(value / Math.max(...widget.data)) * 100}%` }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              Không có nội dung
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
