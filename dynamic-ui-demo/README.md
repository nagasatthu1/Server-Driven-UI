# Dynamic UI Renderer - Config-Driven Architecture

## 📋 Overview

Hệ thống render giao diện động theo mô hình **MVC** với kiến trúc **config-driven**. Backend gửi cấu hình JSON, Frontend nhận config và render ra template động.

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────────┐
│   Frontend      │  ────▶  │    Backend       │  ────▶  │   Page Config   │
│  (Renderer)     │  ◀────  │  (MVC Pattern)   │  ◀────  │    (Model)      │
│                 │  JSON   │                  │         │                 │
└─────────────────┘         └──────────────────┘         └─────────────────┘
```

## 🏗️ Kiến Trúc Backend (MVC)

### Structure
```
backend/
├── server.js              # Entry point, Express app
├── configs/
│   └── componentRegistry.js  # Registry các component types
├── models/
│   └── PageConfig.js      # Định nghĩa cấu hình các trang
├── controllers/
│   ├── pageController.js  # Xử lý logic lấy config trang
│   └── dataController.js  # Xử lý logic lấy dữ liệu động
├── routes/
│   └── pages.js           # Định nghĩa API endpoints
└── package.json
```

### Flow
1. **Model** (`PageConfig.js`): Định nghĩa cấu trúc JSON config cho từng trang
2. **Controller** (`pageController.js`, `dataController.js`): Xử lý business logic
3. **Routes** (`pages.js`): Mapping URLs đến controllers
4. **Component Registry**: Validate và định nghĩa metadata cho components

## 🎨 Frontend Renderer

### Component Renderers
Frontend có registry các hàm render tương ứng với component types:

```javascript
const ComponentRenderers = {
  'row': renderRow,
  'stat-card': renderStatCard,
  'chart': renderChart,
  'data-table': renderDataTable,
  'search-box': renderSearchBox,
  'button': renderButton,
  // ...
};
```

### Data Binding
- Sử dụng cú pháp `{{variableName}}` trong config
- Tự động fetch data từ `dataSource.endpoint`
- Bind data vào DOM thông qua `data-bind` attribute

## 🚀 Quick Start

### 1. Cài đặt Backend
```bash
cd backend
npm install
npm run dev
```

Server sẽ chạy tại: `http://localhost:3000`

### 2. Mở Frontend
Mở file `frontend/DynamicRenderer.html` trong browser hoặc serve bằng live server.

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/pages/list` | Lấy danh sách tất cả pages |
| GET | `/api/pages/:pageId/config` | Lấy config của trang cụ thể |
| GET | `/api/stats/users` | Thống kê users |
| GET | `/api/stats/revenue` | Thống kê revenue |
| GET | `/api/stats/orders` | Thống kê orders |
| GET | `/api/charts/sales-trend` | Dữ liệu chart sales |
| GET | `/api/users` | Danh sách users (pagination, filter) |

## 🔧 Config Format Example

```json
{
  "pageId": "dashboard",
  "pageTitle": "Dashboard Overview",
  "layout": "grid",
  "sections": [
    {
      "id": "stats-row",
      "type": "row",
      "components": [
        {
          "type": "stat-card",
          "props": {
            "title": "Total Users",
            "value": "{{totalUsers}}",
            "icon": "users",
            "color": "blue"
          },
          "dataSource": {
            "endpoint": "/api/stats/users",
            "refreshInterval": 30000
          }
        }
      ]
    }
  ]
}
```

## ✨ Features

### Backend
- ✅ MVC architecture rõ ràng
- ✅ Config-driven design
- ✅ Role-based access control (RBAC)
- ✅ Component validation
- ✅ Dynamic data endpoints
- ✅ CORS enabled

### Frontend
- ✅ Dynamic component rendering
- ✅ Auto data fetching & binding
- ✅ Chart visualization (Chart.js)
- ✅ Data tables with pagination
- ✅ Search & filter functionality
- ✅ Loading states & error handling
- ✅ Responsive design (Tailwind CSS)

## 🎯 Use Cases

1. **Admin Dashboards**: Tạo dashboard động cho nhiều khách hàng
2. **Multi-tenant Apps**: Mỗi tenant có giao diện khác nhau
3. **A/B Testing**: Thay đổi UI mà không cần deploy
4. **White-label Solutions**: Customize UI theo brand
5. **Rapid Prototyping**: Tạo UI nhanh từ config

## 📝 Extending

### Thêm Component Mới

**Backend** (`componentRegistry.js`):
```javascript
'slider': {
  type: 'input',
  propsSchema: {
    min: { type: 'number' },
    max: { type: 'number' },
    step: { type: 'number' }
  }
}
```

**Frontend** (`DynamicRenderer.html`):
```javascript
function renderSlider(component) {
  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = component.props.min;
  slider.max = component.props.max;
  // ...
  return slider;
}

ComponentRenderers['slider'] = renderSlider;
```

### Thêm Page Mới

Thêm vào `PageConfig.js`:
```javascript
newPage: {
  pageId: 'new-page',
  pageTitle: 'New Page Title',
  layout: 'grid',
  sections: [
    // ... components
  ]
}
```

## 🔐 Security Considerations

- Validate config schema trước khi gửi cho FE
- Implement authentication/authorization
- Sanitize user inputs in dynamic components
- Rate limiting cho API endpoints
- HTTPS trong production

---

**Developed with ❤️ using MVC + Config-Driven Architecture**
