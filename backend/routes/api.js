// Routes: Định nghĩa các route API
const express = require('express');
const router = express.Router();
const PageController = require('../controllers/pageController');

// Route lấy danh sách tất cả các trang
router.get('/pages', PageController.getAllPages);

// Route lấy config chi tiết của một trang
router.get('/pages/:pageId', PageController.getPageConfig);

// Route lấy config của một component cụ thể trong trang
router.get('/pages/:pageId/components/:componentType', PageController.getComponentConfig);

module.exports = router;
