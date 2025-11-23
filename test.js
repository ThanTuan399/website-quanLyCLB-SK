// --- File này chỉ dùng để test database và model ---
console.log("--- BẮT ĐẦU KIỂM TRA NỀN MÓNG (DATABASE & MODEL) ---");

const { sequelize, testConnection } = require('./src/config/database');
const User = require('./src/models/user.model');

// Hàm test tổng thể
const runTest = async () => {
  try {
    // 1. Test kết nối (Kiểm tra file database.js)
    console.log("Đang kiểm tra (1/2): Kết nối CSDL...");
    await testConnection();

    // 2. Test Model (Kiểm tra file user.model.js)
    console.log("Đang kiểm tra (2/2): Model User...");
    // .sync({ force: false }) là lệnh kiểm tra xem Model User
    // có khớp với bảng User trong CSDL không.
    // Nếu không khớp (sai tên cột, sai kiểu dữ liệu) nó sẽ báo lỗi.
    await User.sync({ force: false }); 
    console.log("✅ [MODEL] Model User đã liên kết thành công!");

    // 3. Đóng kết nối và thoát
    await sequelize.close();
    console.log("--- KIỂM TRA THÀNH CÔNG! Đã đóng kết nối CSDL. ---");
    process.exit(0); // Thoát với mã thành công

  } catch (error) {
    console.error('❌ KIỂM TRA THẤT BẠI:', error);
    process.exit(1); // Thoát với mã lỗi
  }
};

// Chạy test
runTest();