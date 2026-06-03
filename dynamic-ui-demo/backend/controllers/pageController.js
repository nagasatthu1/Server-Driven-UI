// backend/controllers/pageController.js
// Controller xử lý yêu cầu lấy config trang và dữ liệu động

const PageConfig = require('../models/PageConfig');

class PageController {
  /**
   * Lấy cấu hình trang theo pageId
   * GET /api/pages/:pageId/config
   */
  static getPageConfig(req, res) {
    try {
      const { pageId } = req.params;
      const { role = 'user', permissions = [] } = req.query;

      // Kiểm tra pageId có tồn tại không
      if (!PageConfig[pageId]) {
        return res.status(404).json({
          success: false,
          error: 'Page configuration not found'
        });
      }

      // Clone config để tránh thay đổi gốc
      let config = JSON.parse(JSON.stringify(PageConfig[pageId]));

      // Tùy biến config dựa trên role/permissions (RBAC)
      config = PageController.applyPermissions(config, role, permissions);

      // Thêm metadata
      const response = {
        success: true,
        data: {
          ...config,
          version: '1.0.0',
          lastUpdated: new Date().toISOString()
        }
      };

      res.json(response);
    } catch (error) {
      console.error('Error getting page config:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  /**
   * Áp dụng phân quyền vào config
   * Ẩn/show components dựa trên permissions
   */
  static applyPermissions(config, role, permissions) {
    // Ví dụ: Admin thấy tất cả, user thường bị ẩn một số chức năng
    if (role === 'admin') {
      return config;
    }

    // Duyệt qua các sections và components để lọc
    if (config.sections) {
      config.sections = config.sections.filter(section => {
        // Nếu section có yêu cầu permission đặc biệt
        if (section.requiredPermission) {
          return permissions.includes(section.requiredPermission);
        }
        return true;
      });

      // Lọc components trong mỗi section
      config.sections.forEach(section => {
        if (section.components) {
          section.components = section.components.filter(component => {
            if (component.requiredPermission) {
              return permissions.includes(component.requiredPermission);
            }
            return true;
          });
        }
      });
    }

    return config;
  }

  /**
   * Lấy danh sách tất cả pageIds available
   * GET /api/pages/list
   */
  static getPageList(req, res) {
    try {
      const pageList = Object.keys(PageConfig).map(key => ({
        pageId: key,
        pageTitle: PageConfig[key].pageTitle,
        layout: PageConfig[key].layout
      }));

      res.json({
        success: true,
        data: pageList
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }
}

module.exports = PageController;
