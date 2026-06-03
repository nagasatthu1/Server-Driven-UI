export interface SidebarMenuItem {
  icon?: string
  label: string
  path: string
  badge?: number
  children?: SidebarMenuItem[]
}

export interface PageSidebarConfig {
  pageId: string
  path: string
  sidebarItems: SidebarMenuItem[]
  collapsed?: boolean
  enabled?: boolean
}

export interface WidgetConfig {
  id: string
  type:
    | 'text'
    | 'image'
    | 'chart'
    | 'table'
    | 'form'
    | 'button'
    | 'card'
    | 'custom'
  title: string
  visible: boolean
  position: number
  config: Record<string, unknown>
  styles?: {
    width?: string
    height?: string
    backgroundColor?: string
    textColor?: string
    borderRadius?: string
    padding?: string
    margin?: string
  }
}

export interface PageConfig {
  id: string
  name: string
  path: string
  enabled: boolean
  layout: 'grid' | 'flex' | 'single-column'
  widgets: WidgetConfig[]
  metadata?: {
    description?: string
    icon?: string
    order?: number
  }
}

export interface LayoutConfig {
  pages: PageConfig[]
  globalStyles?: {
    primaryColor?: string
    secondaryColor?: string
    fontFamily?: string
    borderRadius?: string
  }
}

export const defaultWidgetTypes = [
  { type: 'text', label: 'Text Block', icon: 'type' },
  { type: 'image', label: 'Image', icon: 'image' },
  { type: 'chart', label: 'Chart', icon: 'bar-chart' },
  { type: 'table', label: 'Table', icon: 'table' },
  { type: 'form', label: 'Form', icon: 'file-text' },
  { type: 'button', label: 'Button', icon: 'click' },
  { type: 'card', label: 'Card', icon: 'credit-card' },
  { type: 'custom', label: 'Custom Component', icon: 'code' },
] as const

export const widgetDefaultConfigs: Record<string, Record<string, unknown>> = {
  text: { content: 'Enter text here', fontSize: 16, textAlign: 'left' },
  image: { src: '', alt: 'Image', objectFit: 'cover' },
  chart: { chartType: 'bar', data: [], showLegend: true },
  table: { columns: [], data: [], sortable: true },
  form: { fields: [], submitUrl: '', method: 'POST' },
  button: { label: 'Click Me', url: '', variant: 'primary' },
  card: { title: 'Card Title', content: 'Card content', imageUrl: '' },
  custom: { componentName: '', props: {} },
}
