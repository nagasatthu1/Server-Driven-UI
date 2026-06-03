// Controller: Xử lý logic nghiệp vụ và trả về config cho FE
const { pages } = require('../models/PageConfig');

class PageController {
  // Lấy danh sách tất cả các trang
  static getAllPages(req, res) {
    try {
      const pageList = pages.map(page => ({
        id: page.id,
        name: page.name
      }));
      
      res.json({
        success: true,
        data: pageList
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Lỗi khi lấy danh sách trang',
        error: error.message
      });
    }
  }

  // Lấy config chi tiết của một trang
  static getPageConfig(req, res) {
    try {
      const { pageId } = req.params;
      const page = pages.find(p => p.id === pageId);

      if (!page) {
        return res.status(404).json({
          success: false,
          message: `Không tìm thấy trang với id: ${pageId}`
        });
      }

      // Trả về toàn bộ config để FE render động
      res.json({
        success: true,
        data: {
          id: page.id,
          name: page.name,
          components: page.components,
          metadata: {
            version: '1.0',
            lastUpdated: page.createdAt
          }
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Lỗi khi lấy cấu hình trang',
        error: error.message
      });
    }
  }

  // Lấy config cho một component cụ thể trong trang
  static getComponentConfig(req, res) {
    try {
      const { pageId, componentType } = req.params;
      const page = pages.find(p => p.id === pageId);

      if (!page) {
        return res.status(404).json({
          success: false,
          message: `Không tìm thấy trang với id: ${pageId}`
        });
      }

      const components = page.components.filter(c => c.type === componentType);

      if (components.length === 0) {
        return res.status(404).json({
          success: false,
          message: `Không tìm thấy component loại: ${componentType}`
        });
      }

      res.json({
        success: true,
        data: components
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Lỗi khi lấy cấu hình component',
        error: error.message
      });
    }
  }
}

module.exports = PageController;
