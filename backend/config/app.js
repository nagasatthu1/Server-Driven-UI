// Config: Cấu hình ứng dụng
module.exports = {
  port: process.env.PORT || 3000,
  apiPrefix: '/api/v1',
  corsOptions: {
    origin: ['http://localhost:8080', 'http://localhost:3001', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }
};
