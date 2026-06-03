# Admin Page Builder - Drag & Drop Interface

## Overview
This module provides a complete drag-and-drop page builder for the admin panel, allowing administrators to:
- Create and manage pages dynamically
- Add, remove, and reorder widgets using drag-and-drop
- Toggle widget visibility on/off
- Customize widget properties
- Save and load layouts

## Features

### 1. **Drag & Drop Widget Management**
- Built with `@dnd-kit` for smooth drag-and-drop interactions
- Reorder widgets by dragging them up/down
- Visual feedback during drag operations

### 2. **Widget Visibility Toggle**
- Show/hide individual widgets without deleting them
- Hidden widgets are stored separately and can be restored
- Visual indicator for hidden widgets (reduced opacity)

### 3. **Page Management**
- Create multiple pages with different layouts
- Switch between pages easily
- Enable/disable entire pages
- Configure page metadata (path, description, icon)

### 4. **Widget Types**
Supported widget types:
- **Text Block**: Display text content
- **Image**: Show images with configurable alt text
- **Chart**: Display data visualizations
- **Table**: Show tabular data
- **Form**: Create custom forms
- **Button**: Action buttons with links
- **Card**: Content cards with title and image
- **Custom**: Custom React components

### 5. **Layout Persistence**
- Auto-save to localStorage as fallback
- Backend API integration ready
- Load saved layouts on mount

## File Structure

```
src/
├── components/
│   └── admin/
│       ├── AdminLayout.tsx      # Main admin container
│       ├── PageBuilder.tsx      # Drag & drop page builder
│       └── WidgetList.tsx       # Widget list with sorting
├── hooks/
│   ├── usePageBuilder.ts        # Page builder state management
│   └── useConfig.ts             # Layout config hooks (extended)
└── types/
    └── layout.ts                # TypeScript types for layouts
```

## Usage

### Basic Setup

```tsx
import AdminLayout from '@/components/admin/AdminLayout'

// In your router
<Route path="/admin/*" element={<AdminLayout />} />
```

### Using the Page Builder Hook

```tsx
import { usePageBuilder } from '@/hooks/usePageBuilder'

function MyComponent() {
  const {
    pages,
    currentPage,
    addPage,
    addWidget,
    reorderWidgets,
    toggleWidgetVisibility,
  } = usePageBuilder()

  // Use the methods to manage pages and widgets
}
```

### Saving Layouts

```tsx
import { useSaveLayout } from '@/hooks/useConfig'

function SaveButton() {
  const saveLayout = useSaveLayout()

  const handleSave = (layout) => {
    saveLayout.mutate(layout, {
      onSuccess: () => console.log('Layout saved!'),
      onError: (error) => console.error('Save failed:', error),
    })
  }

  return <button onClick={handleSave}>Save Layout</button>
}
```

## Configuration

### Widget Default Configs

Edit `/src/types/layout.ts` to customize default widget configurations:

```typescript
export const widgetDefaultConfigs: Record<string, Record<string, unknown>> = {
  text: { content: 'Enter text here', fontSize: 16 },
  image: { src: '', alt: 'Image', objectFit: 'cover' },
  // ... add more defaults
}
```

### Adding Custom Widget Types

1. Add new type to `WidgetConfig['type']` in `/src/types/layout.ts`
2. Add default config to `widgetDefaultConfigs`
3. Create a renderer component for the widget
4. Add to `defaultWidgetTypes` array

## Backend Integration

The system is designed to work with any backend framework:

### API Endpoints Expected

```
GET    /api/config/layout          - Get layout configuration
POST   /api/config/layout          - Save layout configuration
GET    /api/config/pages/:pageId   - Get specific page config
POST   /api/config/pages           - Create new page
PUT    /api/config/pages/:id       - Update page
DELETE /api/config/pages/:id       - Delete page
```

### Mock Data Fallback

If backend is unavailable, the system uses localStorage as fallback:
```typescript
localStorage.setItem('page-layout', JSON.stringify(layout))
const saved = localStorage.getItem('page-layout')
```

## Dependencies

- `@dnd-kit/core` - Drag and drop context
- `@dnd-kit/sortable` - Sortable list functionality
- `@dnd-kit/utilities` - CSS transforms and utilities
- `uuid` - Generate unique IDs
- `lucide-react` - Icons
- `@tanstack/react-query` - State management

## Styling

All components use Tailwind CSS classes. Customize by:
1. Editing component className props
2. Updating tailwind.config.js theme
3. Adding custom CSS variables

## Accessibility

- Keyboard navigation support
- ARIA labels on interactive elements
- Focus management during drag operations
- Screen reader friendly

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

Note: Drag and drop requires modern browser support for Pointer Events.
