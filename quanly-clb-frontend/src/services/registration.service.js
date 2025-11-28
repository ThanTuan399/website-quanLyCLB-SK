import api from './api';

const registrationService = {
  // Gửi thông tin check-in lên server
  // data gồm: { userId, eventId }
  checkInUser: async (data) => {
    const response = await api.post('/registrations/check-in', data);
    return response.data;
  },

  // Lấy báo cáo thống kê (Dùng cho bước sau)
  getReport: async (eventId) => {
    const response = await api.get(`/registrations/reports/${eventId}`);
    return response.data;
  }
};

export default registrationService;