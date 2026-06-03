// backend/models/PageConfig.js
// Model định nghĩa cấu trúc config cho một trang

const PageConfig = {
  // Cấu hình cho trang Dashboard
  dashboard: {
    pageId: 'dashboard',
    pageTitle: 'Dashboard Overview',
    layout: 'grid',
    sections: [
      {
        id: 'stats-row',
        type: 'row',
        components: [
          {
            type: 'stat-card',
            props: {
              title: 'Total Users',
              value: '{{totalUsers}}',
              icon: 'users',
              color: 'blue'
            },
            dataSource: {
              endpoint: '/api/stats/users',
              refreshInterval: 30000
            }
          },
          {
            type: 'stat-card',
            props: {
              title: 'Revenue',
              value: '{{revenue}}',
              icon: 'dollar',
              color: 'green'
            },
            dataSource: {
              endpoint: '/api/stats/revenue',
              refreshInterval: 60000
            }
          },
          {
            type: 'stat-card',
            props: {
              title: 'Orders',
              value: '{{orders}}',
              icon: 'shopping-cart',
              color: 'orange'
            },
            dataSource: {
              endpoint: '/api/stats/orders',
              refreshInterval: 30000
            }
          }
        ]
      },
      {
        id: 'chart-section',
        type: 'row',
        components: [
          {
            type: 'chart',
            props: {
              title: 'Sales Trend',
              chartType: 'line',
              height: 300
            },
            dataSource: {
              endpoint: '/api/charts/sales-trend',
              params: {
                period: '30d'
              }
            }
          }
        ]
      }
    ]
  },

  // Cấu hình cho trang User List
  userList: {
    pageId: 'user-list',
    pageTitle: 'User Management',
    layout: 'table',
    sections: [
      {
        id: 'toolbar',
        type: 'toolbar',
        components: [
          {
            type: 'search-box',
            props: {
              placeholder: 'Search users...',
              debounce: 300
            },
            action: {
              type: 'filter',
              target: 'user-table'
            }
          },
          {
            type: 'button',
            props: {
              label: 'Add User',
              variant: 'primary',
              icon: 'plus'
            },
            action: {
              type: 'modal',
              modalId: 'add-user-modal'
            }
          }
        ]
      },
      {
        id: 'user-table',
        type: 'table',
        components: [
          {
            type: 'data-table',
            props: {
              columns: [
                { key: 'id', label: 'ID', sortable: true },
                { key: 'name', label: 'Name', sortable: true },
                { key: 'email', label: 'Email', sortable: true },
                { key: 'role', label: 'Role', sortable: true },
                { key: 'status', label: 'Status', render: 'badge' }
              ],
              pagination: {
                pageSize: 10,
                showSizeChanger: true
              },
              actions: [
                { type: 'edit', icon: 'edit' },
                { type: 'delete', icon: 'trash', confirm: true }
              ]
            },
            dataSource: {
              endpoint: '/api/users',
              params: {
                page: '{{currentPage}}',
                size: '{{pageSize}}',
                search: '{{searchTerm}}'
              }
            }
          }
        ]
      }
    ]
  }
};

module.exports = PageConfig;
