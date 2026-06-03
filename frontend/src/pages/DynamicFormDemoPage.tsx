import React, { useState } from 'react'
import { ApiFormRenderer } from '@/components/forms/ApiFormRenderer'
import { FormConfig } from '@/types/api'

// Example: User Registration Form Config (could come from API)
const userRegistrationFormConfig: FormConfig = {
  id: 'user-registration',
  title: 'Đăng ký người dùng',
  description: 'Điền thông tin bên dưới để tạo tài khoản mới',
  layout: 'grid',
  columns: 2,
  sections: [
    {
      title: 'Thông tin cá nhân',
      description: 'Nhập thông tin cá nhân của bạn',
      icon: '👤',
      collapsible: true,
      fields: [
        {
          type: 'text',
          name: 'firstName',
          label: 'Họ',
          placeholder: 'Nguyễn',
          required: true,
          grid: { colspan: 1 },
          validation: { minLength: 2, maxLength: 50 },
        },
        {
          type: 'text',
          name: 'lastName',
          label: 'Tên',
          placeholder: 'Văn A',
          required: true,
          grid: { colspan: 1 },
          validation: { minLength: 2, maxLength: 50 },
        },
        {
          type: 'email',
          name: 'email',
          label: 'Email',
          placeholder: 'example@email.com',
          required: true,
          grid: { colspan: 2 },
          validation: { pattern: '^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$' },
          helpText: 'Chúng tôi sẽ gửi email xác nhận đến địa chỉ này',
        },
        {
          type: 'tel',
          name: 'phone',
          label: 'Số điện thoại',
          placeholder: '0912345678',
          required: true,
          grid: { colspan: 2 },
          prefix: '+84',
          validation: { pattern: '^[0-9]{9,10}$' },
        },
        {
          type: 'date',
          name: 'birthdate',
          label: 'Ngày sinh',
          required: false,
          grid: { colspan: 2 },
        },
      ],
    },
    {
      title: 'Thông tin tài khoản',
      description: 'Thiết lập thông tin đăng nhập',
      icon: '🔐',
      collapsible: true,
      defaultCollapsed: false,
      fields: [
        {
          type: 'select',
          name: 'role',
          label: 'Vai trò',
          required: true,
          grid: { colspan: 1 },
          options: [
            { value: '', label: 'Chọn vai trò...' },
            { value: 'user', label: 'Người dùng' },
            { value: 'admin', label: 'Quản trị viên' },
            { value: 'manager', label: 'Quản lý', disabled: true },
          ],
        },
        {
          type: 'multiselect',
          name: 'permissions',
          label: 'Quyền hạn',
          grid: { colspan: 1 },
          options: [
            { value: 'read', label: 'Xem' },
            { value: 'write', label: 'Viết' },
            { value: 'delete', label: 'Xóa' },
            { value: 'admin', label: 'Quản trị' },
          ],
        },
        {
          type: 'password',
          name: 'password',
          label: 'Mật khẩu',
          required: true,
          grid: { colspan: 1 },
          validation: {
            minLength: 8,
            pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)',
          },
          helpText: 'Ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số',
        },
        {
          type: 'password',
          name: 'confirmPassword',
          label: 'Xác nhận mật khẩu',
          required: true,
          grid: { colspan: 1 },
        },
        {
          type: 'switch',
          name: 'newsletter',
          label: 'Đăng ký nhận tin',
          defaultValue: false,
          grid: { colspan: 2 },
          helpText: 'Nhận thông báo về sản phẩm và khuyến mãi mới',
        },
        {
          type: 'checkbox',
          name: 'terms',
          label: 'Tôi đồng ý với điều khoản sử dụng',
          required: true,
          grid: { colspan: 2 },
          errorMessage: 'Bạn phải đồng ý với điều khoản sử dụng',
        },
      ],
    },
    {
      title: 'Thông tin bổ sung',
      description: 'Các thông tin tùy chọn',
      icon: '📝',
      collapsible: true,
      defaultCollapsed: true,
      fields: [
        {
          type: 'textarea',
          name: 'bio',
          label: 'Giới thiệu bản thân',
          placeholder: 'Mô tả ngắn về bạn...',
          grid: { colspan: 2 },
          validation: { maxLength: 500 },
          helpText: 'Tối đa 500 ký tự',
        },
        {
          type: 'radio',
          name: 'gender',
          label: 'Giới tính',
          grid: { colspan: 2 },
          options: [
            { value: 'male', label: 'Nam' },
            { value: 'female', label: 'Nữ' },
            { value: 'other', label: 'Khác' },
            { value: 'prefer-not', label: 'Không muốn tiết lộ' },
          ],
        },
        {
          type: 'file',
          name: 'avatar',
          label: 'Ảnh đại diện',
          grid: { colspan: 2 },
          helpText: 'Định dạng: JPG, PNG. Tối đa 2MB',
        },
        {
          type: 'color',
          name: 'themeColor',
          label: 'Màu chủ đạo',
          defaultValue: '#3B82F6',
          grid: { colspan: 1 },
        },
        {
          type: 'number',
          name: 'experience',
          label: 'Số năm kinh nghiệm',
          grid: { colspan: 1 },
          validation: {
            min: 0,
            max: 50,
          },
        },
        // Conditional field example
        {
          type: 'text',
          name: 'companyName',
          label: 'Tên công ty',
          grid: { colspan: 2 },
          conditional: {
            field: 'role',
            operator: 'equals',
            value: 'manager',
          },
        },
      ],
    },
  ],
  submitButton: {
    text: 'Đăng ký',
    loadingText: 'Đang xử lý...',
    variant: 'primary',
    icon: '✓',
  },
  cancelButton: {
    text: 'Làm lại',
    show: true,
  },
}

export const DynamicFormDemoPage: React.FC = () => {
  const [submissionResult, setSubmissionResult] = useState<any>(null)

  const handleSubmit = async (data: Record<string, any>) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Simulate validation error for demo
    if (data.password !== data.confirmPassword) {
      return {
        success: false,
        message: 'Mật khẩu xác nhận không khớp',
        errors: { confirmPassword: 'Mật khẩu xác nhận không khớp' },
      }
    }

    console.log('Form submitted:', data)
    setSubmissionResult({ success: true, data })
    return { success: true, message: 'Đăng ký thành công!', data }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Dynamic Form Builder
          </h1>
          <p className="mt-2 text-gray-600">
            Render form từ cấu hình API - Hỗ trợ đầy đủ các loại trường,
            validation và conditional logic
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* API Form Renderer */}
        <ApiFormRenderer
          formConfig={userRegistrationFormConfig}
          onSubmit={handleSubmit}
        />

        {/* Submission Result */}
        {submissionResult && (
          <div
            className={`mt-8 p-6 rounded-xl border ${
              submissionResult.success
                ? 'bg-green-50 border-green-200'
                : 'bg-red-50 border-red-200'
            }`}
          >
            <h3
              className={`text-lg font-semibold ${
                submissionResult.success ? 'text-green-800' : 'text-red-800'
              }`}
            >
              {submissionResult.success ? '✓ Thành công' : '✗ Lỗi'}
            </h3>
            {submissionResult.message && (
              <p
                className={`mt-2 ${
                  submissionResult.success ? 'text-green-700' : 'text-red-700'
                }`}
              >
                {submissionResult.message}
              </p>
            )}
            {submissionResult.data && (
              <pre className="mt-4 text-xs bg-white p-4 rounded-lg overflow-auto text-gray-700">
                {JSON.stringify(submissionResult.data, null, 2)}
              </pre>
            )}
            <button
              onClick={() => setSubmissionResult(null)}
              className="mt-4 text-sm text-gray-600 hover:text-gray-800 underline"
            >
              Đóng
            </button>
          </div>
        )}

        {/* Features List */}
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: '🎨',
              title: 'Dynamic Rendering',
              desc: 'Render form từ JSON config API',
            },
            {
              icon: '✅',
              title: 'Validation',
              desc: 'Built-in validation với custom rules',
            },
            {
              icon: '🔀',
              title: 'Conditional Logic',
              desc: 'Hiện/ẩn field dựa trên giá trị',
            },
            {
              icon: '📱',
              title: 'Responsive',
              desc: 'Grid layout responsive mọi thiết bị',
            },
            {
              icon: '🎭',
              title: 'Multiple Types',
              desc: '15+ loại field khác nhau',
            },
            {
              icon: '⚡',
              title: 'Real-time',
              desc: 'Update UI ngay khi có dữ liệu',
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
            >
              <span className="text-3xl">{feature.icon}</span>
              <h3 className="mt-4 font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
