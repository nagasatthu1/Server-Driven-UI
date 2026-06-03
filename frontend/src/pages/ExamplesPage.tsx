import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import { Modal } from '@/components/ui/Modal'
import {
  Input,
  Textarea,
  Select,
  Checkbox,
  Switch,
  RadioGroup,
} from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import {
  User,
  Mail,
  Phone,
  Calendar,
  Lock,
  Search,
  CreditCard,
  Globe,
  FileText,
} from 'lucide-react'

export default function ExamplesPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activePath, setActivePath] = useState('/examples')
  const [modalOpen, setModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    bio: '',
    notifications: true,
    newsletter: false,
    theme: 'light',
  })

  const departmentOptions = [
    { value: 'it', label: 'Công nghệ thông tin' },
    { value: 'hr', label: 'Nhân sự' },
    { value: 'finance', label: 'Tài chính' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Kinh doanh' },
  ]

  const themeOptions = [
    { value: 'light', label: 'Sáng' },
    { value: 'dark', label: 'Tối' },
    { value: 'system', label: 'Theo hệ thống' },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activePath={activePath}
        onNavigate={setActivePath}
      />

      {/* Main Content */}
      <main
        className={`transition-all duration-300 ${
          sidebarCollapsed ? 'ml-sidebar-collapsed' : 'ml-sidebar'
        }`}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">Ví dụ Components</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setModalOpen(true)}
              >
                Mở Popup
              </Button>
              <Button size="sm">Action Button</Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="container py-8 space-y-12">
          {/* Form Inputs Section */}
          <section className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Nhập liệu cơ bản</h2>
              <p className="text-muted-foreground">
                Các thành phần nhập liệu thông dụng
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Text Input with Icon */}
              <div className="space-y-4 p-6 rounded-lg border bg-card">
                <h3 className="font-medium">Input với icon</h3>
                <Input
                  label="Tên đăng nhập"
                  placeholder="Nhập tên..."
                  icon={<User size={18} />}
                />
                <Input
                  label="Email"
                  type="email"
                  placeholder="email@example.com"
                  icon={<Mail size={18} />}
                />
                <Input
                  label="Số điện thoại"
                  type="tel"
                  placeholder="+84 ..."
                  icon={<Phone size={18} />}
                />
              </div>

              {/* Input with Validation */}
              <div className="space-y-4 p-6 rounded-lg border bg-card">
                <h3 className="font-medium">Validation</h3>
                <Input
                  label="Mật khẩu"
                  type="password"
                  placeholder="••••••••"
                  icon={<Lock size={18} />}
                  error="Mật khẩu phải có ít nhất 8 ký tự"
                />
                <Input
                  label="Xác nhận mật khẩu"
                  type="password"
                  placeholder="••••••••"
                  icon={<Lock size={18} />}
                />
                <Input
                  label="Mã xác thực"
                  placeholder="ABC123"
                  hint="Kiểm tra email của bạn"
                  rightElement={
                    <Button variant="ghost" size="sm">
                      Gửi lại
                    </Button>
                  }
                />
              </div>

              {/* Select & Date */}
              <div className="space-y-4 p-6 rounded-lg border bg-card">
                <h3 className="font-medium">Select & Date</h3>
                <Select
                  label="Phòng ban"
                  options={departmentOptions}
                  placeholder="Chọn phòng ban"
                />
                <Input
                  label="Ngày sinh"
                  type="date"
                  icon={<Calendar size={18} />}
                />
                <Input
                  label="Website"
                  type="url"
                  placeholder="https://example.com"
                  icon={<Globe size={18} />}
                />
              </div>

              {/* Textarea */}
              <div className="space-y-4 p-6 rounded-lg border bg-card md:col-span-2">
                <h3 className="font-medium">Textarea</h3>
                <Textarea
                  label="Giới thiệu bản thân"
                  placeholder="Mô tả ngắn gọn về bạn..."
                  rows={4}
                  hint="Tối đa 500 ký tự"
                />
                <Textarea
                  label="Lời nhắn"
                  placeholder="Để lại lời nhắn..."
                  rows={3}
                  error="Vui lòng nhập lời nhắn"
                />
              </div>

              {/* Search & Special Inputs */}
              <div className="space-y-4 p-6 rounded-lg border bg-card">
                <h3 className="font-medium">Tìm kiếm & Đặc biệt</h3>
                <Input placeholder="Tìm kiếm..." icon={<Search size={18} />} />
                <Input
                  label="Số thẻ tín dụng"
                  placeholder="0000 0000 0000 0000"
                  icon={<CreditCard size={18} />}
                  maxLength={19}
                />
                <Input
                  label="Tìm kiếm tài liệu"
                  placeholder="Nhập từ khóa..."
                  leftElement={<FileText size={18} />}
                  rightElement={
                    <Button variant="ghost" size="icon">
                      <Search size={16} />
                    </Button>
                  }
                />
              </div>
            </div>
          </section>

          {/* Checkbox, Radio, Switch Section */}
          <section className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Checkbox, Radio & Switch
              </h2>
              <p className="text-muted-foreground">Các thành phần lựa chọn</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {/* Checkbox */}
              <div className="space-y-4 p-6 rounded-lg border bg-card">
                <h3 className="font-medium">Checkbox</h3>
                <Checkbox label="Đồng ý với điều khoản" />
                <Checkbox label="Nhận email marketing" />
                <Checkbox label="Tự động đăng nhập" disabled />
                <Checkbox label="Có lỗi" error="Vui lòng chọn" />
              </div>

              {/* Radio Group */}
              <div className="space-y-4 p-6 rounded-lg border bg-card">
                <h3 className="font-medium">Radio Group</h3>
                <RadioGroup
                  name="theme"
                  label="Chủ đề"
                  options={themeOptions}
                  value={formData.theme}
                  onChange={(value) =>
                    setFormData({ ...formData, theme: value })
                  }
                />
              </div>

              {/* Switch */}
              <div className="space-y-4 p-6 rounded-lg border bg-card">
                <h3 className="font-medium">Switch</h3>
                <Switch
                  label="Thông báo"
                  description="Bật thông báo push"
                  checked={formData.notifications}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, notifications: checked })
                  }
                />
                <Switch
                  label="Newsletter"
                  description="Nhận tin tức hàng tuần"
                  checked={formData.newsletter}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, newsletter: checked })
                  }
                />
                <Switch
                  label="Disabled"
                  description="Không thể thay đổi"
                  disabled
                />
              </div>
            </div>
          </section>

          {/* Buttons Section */}
          <section className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Buttons</h2>
              <p className="text-muted-foreground">Các loại nút bấm</p>
            </div>

            <div className="space-y-4 p-6 rounded-lg border bg-card">
              <div className="flex flex-wrap gap-4">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button size="lg">Large</Button>
                <Button size="default">Default</Button>
                <Button size="sm">Small</Button>
                <Button size="icon">🔍</Button>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button disabled>Disabled</Button>
                <Button loading>Loading</Button>
              </div>
            </div>
          </section>

          {/* Cards Section */}
          <section className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Cards</h2>
              <p className="text-muted-foreground">Thẻ hiển thị thông tin</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Simple Card */}
              <div className="rounded-lg border bg-card text-card-foreground shadow-soft">
                <div className="p-6 space-y-2">
                  <h3 className="font-semibold text-lg">Card tiêu đề</h3>
                  <p className="text-sm text-muted-foreground">
                    Mô tả ngắn gọn về nội dung của card này.
                  </p>
                </div>
                <div className="border-t p-6">
                  <Button className="w-full">Hành động</Button>
                </div>
              </div>

              {/* Stats Card */}
              <div className="rounded-lg border bg-card text-card-foreground shadow-soft">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-muted-foreground">
                      Tổng người dùng
                    </p>
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="mt-2">
                    <p className="text-3xl font-bold">1,234</p>
                    <p className="text-xs text-success mt-1">
                      +12.5% so với tháng trước
                    </p>
                  </div>
                </div>
              </div>

              {/* Profile Card */}
              <div className="rounded-lg border bg-card text-card-foreground shadow-soft">
                <div className="p-6 text-center">
                  <div className="mx-auto h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
                    AD
                  </div>
                  <h3 className="mt-4 font-semibold text-lg">Admin User</h3>
                  <p className="text-sm text-muted-foreground">
                    admin@example.com
                  </p>
                  <div className="mt-4 flex gap-2 justify-center">
                    <Button size="sm">Xem profile</Button>
                    <Button size="sm" variant="outline">
                      Nhắn tin
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Demo Modal */}
      <Modal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title="Xác nhận hành động"
        description="Bạn có chắc chắn muốn thực hiện hành động này?"
        size="md"
        footer={
          <>
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Hủy
            </Button>
            <Button onClick={() => setModalOpen(false)}>Xác nhận</Button>
          </>
        }
      >
        <div className="space-y-4">
          <p>
            Đây là nội dung của popup. Bạn có thể đặt bất kỳ component nào ở
            đây.
          </p>
          <Input label="Nhập thông tin bổ sung" placeholder="..." />
        </div>
      </Modal>
    </div>
  )
}
