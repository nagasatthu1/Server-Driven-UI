// Server: Điểm vào chính của ứng dụng backend
const express = require('express');
const cors = require('cors');
const config = require('./config/app');
const apiRoutes = require('./routes/api');

const app = express();

// Middleware
app.use(cors(config.corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use(config.apiPrefix, apiRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Chào mừng đến với API Server',
    version: '1.0.0',
    endpoints: {
      pages: `${config.apiPrefix}/pages`,
      pageDetail: `${config.apiPrefix}/pages/:pageId`,
      component: `${config.apiPrefix}/pages/:pageId/components/:componentType`
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Không tìm thấy route'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Lỗi server nội bộ',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
  console.log(`📡 API endpoints tại http://localhost:${PORT}${config.apiPrefix}`);
  console.log('\nCác route có sẵn:');
  console.log(`  GET /${config.apiPrefix}/pages - Lấy danh sách trang`);
  console.log(`  GET /${config.apiPrefix}/pages/:pageId - Lấy config trang chi tiết`);
  console.log(`  GET /${config.apiPrefix}/pages/:pageId/components/:type - Lấy config component`);
});

module.exports = app;
