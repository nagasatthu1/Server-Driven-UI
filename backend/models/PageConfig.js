// Model: Định nghĩa cấu trúc dữ liệu cho các component
class PageConfig {
  constructor(id, name, components) {
    this.id = id;
    this.name = name;
    this.components = components; // Mảng các component config
    this.createdAt = new Date();
  }
}

class ComponentConfig {
  constructor(type, props, children = []) {
    this.type = type; // 'header', 'button', 'form', 'table', v.v.
    this.props = props; // Các thuộc tính của component
    this.children = children; // Các component con (nếu có)
  }
}

// Mock data - Trong thực tế sẽ lấy từ database
const pages = [
  new PageConfig('home', 'Trang chủ', [
    new ComponentConfig('header', {
      title: 'Chào mừng đến với ứng dụng',
      subtitle: 'Giải pháp MVC động',
      theme: 'primary'
    }),
    new ComponentConfig('hero', {
      title: 'Xây dựng nhanh hơn',
      description: 'Với kiến trúc MVC và render động từ backend',
      buttonText: 'Bắt đầu ngay',
      buttonAction: '/signup'
    }),
    new ComponentConfig('feature-grid', {
      title: 'Tính năng nổi bật',
      items: [
        { icon: '⚡', title: 'Nhanh chóng', desc: 'Render động từ server' },
        { icon: '🎨', title: 'Linh hoạt', desc: 'Thay đổi UI không cần deploy FE' },
        { icon: '🔧', title: 'Dễ bảo trì', desc: 'Kiến trúc MVC rõ ràng' }
      ]
    })
  ]),
  new PageConfig('dashboard', 'Dashboard', [
    new ComponentConfig('header', {
      title: 'Dashboard',
      subtitle: 'Tổng quan hệ thống',
      theme: 'secondary'
    }),
    new ComponentConfig('stats-cards', {
      cards: [
        { label: 'Người dùng', value: '1,234', trend: '+12%' },
        { label: 'Doanh thu', value: '₫56M', trend: '+8%' },
        { label: 'Đơn hàng', value: '89', trend: '+23%' }
      ]
    }),
    new ComponentConfig('data-table', {
      title: 'Giao dịch gần đây',
      columns: ['ID', 'Khách hàng', 'Số tiền', 'Trạng thái'],
      data: [
        ['TX001', 'Nguyễn Văn A', '₫2,500,000', 'Hoàn thành'],
        ['TX002', 'Trần Thị B', '₫1,200,000', 'Đang xử lý'],
        ['TX003', 'Lê Văn C', '₫3,800,000', 'Hoàn thành']
      ]
    })
  ])
];

module.exports = { PageConfig, ComponentConfig, pages };
