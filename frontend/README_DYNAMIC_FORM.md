# Dynamic Form Builder - Hướng dẫn sử dụng

## Tổng quan

Hệ thống cho phép render form động từ cấu hình API. Mọi thứ (field types, validation, layout, conditional logic) đều được cấu hình từ backend và frontend tự động render.

## Kiến trúc

```
API Response (JSON)
    ↓
FormConfig Interface
    ↓
useDynamicForm Hook
    ↓
ApiFormRenderer Component
    ↓
DynamicForm → DynamicFieldRenderer
    ↓
UI Rendered
```

## Cách sử dụng

### 1. Cấu hình từ API

Backend trả về JSON theo cấu trúc:

```json
{
  "success": true,
  "data": {
    "id": "user-form",
    "title": "Đăng ký người dùng",
    "description": "Điền thông tin bên dưới",
    "layout": "grid",
    "columns": 2,
    "sections": [
      {
        "title": "Thông tin cá nhân",
        "icon": "👤",
        "collapsible": true,
        "fields": [
          {
            "type": "text",
            "name": "firstName",
            "label": "Họ",
            "placeholder": "Nguyễn",
            "required": true,
            "validation": {
              "minLength": 2,
              "maxLength": 50
            },
            "grid": { "colspan": 1 }
          }
        ]
      }
    ],
    "submitButton": {
      "text": "Đăng ký",
      "variant": "primary"
    }
  }
}
```

### 2. Sử dụng component

```tsx
import { ApiFormRenderer } from '@/components/forms';

function MyPage() {
  const handleSubmit = async (data) => {
    console.log('Form data:', data);
    return { success: true };
  };

  return (
    <ApiFormRenderer
      apiEndpoint="/api/form-config/user-registration"
      onSubmit={handleSubmit}
    />
  );
}
```

### 3. Hoặc truyền config trực tiếp

```tsx
import { ApiFormRenderer } from '@/components/forms';
import { FormConfig } from '@/types';

const myConfig: FormConfig = {
  id: 'my-form',
  title: 'My Form',
  sections: [...]
};

function MyPage() {
  return (
    <ApiFormRenderer
      formConfig={myConfig}
      onSubmit={handleSubmit}
    />
  );
}
```

## Các loại field hỗ trợ

| Type | Mô tả |
|------|-------|
| `text` | Text input thông thường |
| `password` | Password input |
| `email` | Email input với validation |
| `number` | Number input |
| `tel` | Telephone input |
| `date` | Date picker |
| `time` | Time picker |
| `datetime-local` | DateTime picker |
| `textarea` | Multi-line text |
| `select` | Dropdown single select |
| `multiselect` | Checkbox group |
| `checkbox` | Single checkbox |
| `radio` | Radio button group |
| `switch` | Toggle switch |
| `file` | File upload |
| `color` | Color picker |

## Validation

```typescript
{
  type: 'text',
  name: 'username',
  validation: {
    pattern: '^[a-zA-Z0-9_]+$',      // Regex pattern
    minLength: 3,                     // Độ dài tối thiểu
    maxLength: 20,                    // Độ dài tối đa
    min: 0,                           // Giá trị min (cho number)
    max: 100,                         // Giá trị max (cho number)
    custom: (value) => {              // Custom validation
      return value.includes('@') || 'Phải chứa @';
    }
  }
}
```

## Conditional Logic (Hiện/ẩn field)

```typescript
{
  type: 'text',
  name: 'companyName',
  label: 'Tên công ty',
  conditional: {
    field: 'role',           // Field để kiểm tra điều kiện
    operator: 'equals',      // equals, notEquals, contains, greaterThan, lessThan
    value: 'manager'         // Giá trị so sánh
  }
}
```

Field này sẽ chỉ hiện khi field `role` có giá trị là `manager`.

## Grid Layout

```typescript
{
  type: 'text',
  name: 'fullName',
  grid: {
    colspan: 2  // 1, 2, 3, 4, 6, 12
  }
}
```

## Custom Styling

```typescript
{
  type: 'text',
  name: 'customField',
  style: {
    className: 'my-custom-class',
    wrapperClassName: 'wrapper-class',
    labelClassName: 'label-class',
    inputClassName: 'input-class'
  }
}
```

## Hooks API

### useDynamicForm

```typescript
const {
  config,           // Form config từ API
  formData,         // Current form data
  errors,           // Validation errors
  loading,          // Loading state
  submitting,       // Submitting state
  handleChange,     // (name, value) => void
  handleSubmit,     // (e) => Promise<Result>
  resetForm,        // () => void
  validateForm,     // () => boolean
  getVisibleFields, // (fields) => Field[]
} = useDynamicForm({
  formConfig,       // Optional: Config trực tiếp
  apiEndpoint,      // Optional: URL fetch config
  initialData,      // Optional: Default values
  onSubmit,         // Optional: Submit handler
});
```

## Ví dụ trang demo

Truy cập `/dynamic-form` để xem demo đầy đủ với:
- Form đăng ký người dùng
- Đầy đủ các loại field
- Validation
- Conditional logic
- Grid layout
- Collapsible sections

## Backend Integration

Backend cần trả về endpoint:

```
GET /api/form-config/{formId}
Response: ApiResponse<FormConfig>
```

Và endpoint submit:

```
POST /api/form-submit/{formId}
Body: Record<string, any>
Response: FormSubmissionResult
```

## Files

- `src/types/api.ts` - TypeScript interfaces
- `src/hooks/useDynamicForm.ts` - Form logic hook
- `src/components/forms/DynamicFieldRenderer.tsx` - Field renderer
- `src/components/forms/DynamicForm.tsx` - Form container
- `src/components/forms/ApiFormRenderer.tsx` - Main component
- `src/pages/DynamicFormDemoPage.tsx` - Demo page
