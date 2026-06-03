// backend/controllers/dataController.js
// Controller xử lý lấy dữ liệu động cho các components

class DataController {
  /**
   * Lấy thống kê users
   * GET /api/stats/users
   */
  static getUserStats(req, res) {
    // Giả lập dữ liệu từ database
    const stats = {
      totalUsers: 1250,
      activeUsers: 890,
      newUsersToday: 45,
      growthRate: '+12.5%'
    };
    
    res.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Lấy thống kê revenue
   * GET /api/stats/revenue
   */
  static getRevenueStats(req, res) {
    const stats = {
      revenue: '$125,430',
      monthlyRevenue: '$42,150',
      growthRate: '+8.3%',
      currency: 'USD'
    };
    
    res.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Lấy thống kê orders
   * GET /api/stats/orders
   */
  static getOrderStats(req, res) {
    const stats = {
      orders: 3420,
      pendingOrders: 156,
      completedToday: 89,
      completionRate: '94.2%'
    };
    
    res.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Lấy dữ liệu chart sales trend
   * GET /api/charts/sales-trend
   */
  static getSalesTrend(req, res) {
    const { period = '30d' } = req.query;
    
    // Giả lập dữ liệu chart
    const chartData = {
      labels: [],
      datasets: [
        {
          label: 'Sales',
          data: [],
          borderColor: '#4F46E5',
          backgroundColor: 'rgba(79, 70, 229, 0.1)',
          fill: true
        }
      ]
    };

    // Tạo dữ liệu giả cho period ngày
    const days = period === '7d' ? 7 : period === '30d' ? 30 : 90;
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (days - i - 1));
      chartData.labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
      chartData.datasets[0].data.push(Math.floor(Math.random() * 5000) + 1000);
    }

    res.json({
      success: true,
      data: chartData,
      period: period,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Lấy danh sách users (với pagination và filter)
   * GET /api/users
   */
  static getUsers(req, res) {
    const { page = 1, size = 10, search = '' } = req.query;
    
    // Giả lập dữ liệu users
    const allUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user', status: 'inactive' },
      { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'manager', status: 'active' },
      { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'user', status: 'active' },
      { id: 6, name: 'Diana Lee', email: 'diana@example.com', role: 'user', status: 'pending' },
      { id: 7, name: 'Edward Kim', email: 'edward@example.com', role: 'admin', status: 'active' },
      { id: 8, name: 'Fiona Chen', email: 'fiona@example.com', role: 'user', status: 'active' },
      { id: 9, name: 'George Wang', email: 'george@example.com', role: 'user', status: 'inactive' },
      { id: 10, name: 'Helen Park', email: 'helen@example.com', role: 'manager', status: 'active' },
      { id: 11, name: 'Ivan Petrov', email: 'ivan@example.com', role: 'user', status: 'active' },
      { id: 12, name: 'Julia Martinez', email: 'julia@example.com', role: 'user', status: 'pending' }
    ];

    // Filter theo search
    let filteredUsers = allUsers;
    if (search) {
      const searchLower = search.toLowerCase();
      filteredUsers = allUsers.filter(user => 
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
      );
    }

    // Pagination
    const pageNum = parseInt(page);
    const pageSize = parseInt(size);
    const startIndex = (pageNum - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: {
        users: paginatedUsers,
        pagination: {
          currentPage: pageNum,
          pageSize: pageSize,
          totalItems: filteredUsers.length,
          totalPages: Math.ceil(filteredUsers.length / pageSize)
        }
      },
      timestamp: new Date().toISOString()
    });
  }
}

module.exports = DataController;
