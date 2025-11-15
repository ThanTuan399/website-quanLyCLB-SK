// --- Bước 2.5: Tạo Router (Bảng chỉ dẫn) ---
// File này định nghĩa các đường dẫn (endpoints) cho Module Auth

const express = require('express');
const router = express.Router();

// Import file controller (nơi chứa logic)
const authController = require('../controllers/auth.controller');

// Định nghĩa đường dẫn cho Đăng ký
// Khi có yêu cầu POST tới /register, hãy gọi hàm authController.register
router.post('/register', authController.register);

// Định nghĩa đường dẫn cho Đăng nhập
// Khi có yêu cầu POST tới /login, hãy gọi hàm authController.login
router.post('/login', authController.login);

// "Chia sẻ" (export) router này để file index.js có thể dùng
module.exports = router;


// ---

// ### 4. Cách kiểm thử (Test)

// Sau khi đã tạo và **lưu (Save)** 5 file này, bạn hãy:

// 1.  Dừng server cũ (`Ctrl + C`).
// 2.  Chạy server mới: `node index.js`.
// 3.  Nếu không có lỗi và bạn thấy `Server đang chạy...` và `Kết nối CSDL...`, hãy mở **Postman** (xem file `Giai_doan_2_Test_Plan.md` để biết cách test chi tiết).

// **Test Đăng ký:**
// * **Phương thức:** `POST`
// * **URL:** `http://localhost:3000/api/auth/register`
// * **Tab Body:** chọn `raw` và `JSON`, nhập:
//     ```json
//     {
//       "hoTen": "Test User",
//       "email": "test@example.com",
//       "matKhau": "123456",
//       "mssv": "12345"
//     }
//     ```
// * Nhấn **Send**. Bạn sẽ nhận được `{"message": "Tạo tài khoản thành công!"}`.

// **Test Đăng nhập:**
// * **Phương thức:** `POST`
// * **URL:** `http://localhost:3000/api/auth/login`
// * **Tab Body:** chọn `raw` và `JSON`, nhập:
//     ```json
//     {
//       "email": "test@example.com",
//       "matKhau": "123456"
//     }
