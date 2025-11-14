Cấu trúc thư mục cho Giai đoạn 2Dựa trên TẦNG 4 (Triển khai API), chúng ta sẽ bắt đầu tổ chức code của mình theo cấu trúc chuyên nghiệp.Hãy tạo một thư mục tên src trong dự án quanly-clb-backend của bạn.quanly-clb-backend/
├── node_modules/
├── src/
│   ├── config/
│   │   └── database.js   (File chúng ta sẽ tạo - Bước 2.2)
│   ├── controllers/
│   │   └── auth.controller.js (File chúng ta sẽ tạo - Bước 2.3)
│   ├── models/
│   │   └── user.model.js     (File chúng ta sẽ tạo - Bước 2.2)
│   └── routes/
│       └── auth.route.js     (File chúng ta sẽ tạo - Bước 2.4)
├── index.js                (File chúng ta sẽ cập nhật - Bước 2.5)
├── package-lock.json
└── package.json
Mục tiêu của Bước 2.1:Kết nối thành công với CSDL MySQL (quanlyclb_db).Tạo ra 2 API: POST /api/auth/register và POST /api/auth/login.Test 2 API này thành công bằng Postman.
