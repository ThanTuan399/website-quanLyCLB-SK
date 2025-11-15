// 1. IMPORT CÁC THƯ VIỆN
// import (require)
const {sequelize, testConnection } = require('./src/config/database');
// "Import" thư viện Express
const express = require('express'); 
const authRoutes = require('./src/routes/auth.route.js');

// 2. CẤU HÌNH ỨNG DỤNG 
const app= express();
const PORT= 3000;
// đọc JSON mà Postman gửi lên
app.use(express.json());

// 3. ĐỊNH NGHĨA ROUTES (ĐƯỜNG DẪN)
app.get('/hello', (req, res) => 
{
  res.json({message: "hello backend! CSDL đã kết nối!"});
});
// Sử dụng Auth Routes
app.use('/api/auth', authRoutes);

// 4. KHỞI ĐỘNG SERVER
app.listen(PORT, async () => {
  console.log('Server đang chạy tại http://localhost:${PORT}');
  await testConnection();
});