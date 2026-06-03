// backend/routes/pages.js
// Routes cho các API liên quan đến page config và data

const express = require('express');
const router = express.Router();
const PageController = require('../controllers/pageController');
const DataController = require('../controllers/dataController');

/**
 * Routes lấy cấu hình trang
 */
// Lấy danh sách tất cả pages available
router.get('/pages/list', PageController.getPageList);

// Lấy config của một trang cụ thể
router.get('/pages/:pageId/config', PageController.getPageConfig);

/**
 * Routes lấy dữ liệu động cho components
 */
// Stats endpoints
router.get('/stats/users', DataController.getUserStats);
router.get('/stats/revenue', DataController.getRevenueStats);
router.get('/stats/orders', DataController.getOrderStats);

// Chart endpoints
router.get('/charts/sales-trend', DataController.getSalesTrend);

// Data endpoints
router.get('/users', DataController.getUsers);

module.exports = router;
