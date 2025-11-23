import api from './api';

const userService = {
  // Lấy thông tin chi tiết của user (đã có API từ Backend)
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  // Cập nhật thông tin user
  updateProfile: async (userData) => {
    const response = await api.put('/users/profile', userData);
    return response.data;
  },

  // Lấy lịch sử đăng ký sự kiện
  // (Hiện tại Backend chưa có API này, chúng ta sẽ Mock data giả lập)
  getMyRegistrations: async () => {
    // Giả lập độ trễ
    await new Promise(resolve => setTimeout(resolve, 500));

    return [
      {
        id: 1,
        tenSuKien: "Đêm nhạc Acoustic Mùa Thu",
        thoiGian: "2025-11-20T19:00:00",
        trangThai: "Đã đăng ký",
        diaDiem: "Hội trường A"
      },
      {
        id: 2,
        tenSuKien: "Workshop: Kỹ năng Lập trình ReactJS",
        thoiGian: "2025-11-25T08:00:00",
        trangThai: "Chờ duyệt",
        diaDiem: "Phòng Lab 3"
      }
    ];
  }
};

export default userService;