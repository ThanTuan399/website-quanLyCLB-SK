import api from './api';

const eventService = 
{
  // Lấy danh sách tất cả sự kiện
  getAllEvents: async () => 
    {
      try {
      const response = await api.get('/events');
      return response.data;
    } catch (error) {
      console.warn("Chưa kết nối được API Events, dùng dữ liệu giả...");
      // Nếu lỗi (do BE chưa xong), trả về dữ liệu giả cũ (giữ nguyên code mock cũ của bạn ở đây)
      return [ /* 
        {
        eventId: 1,
        tenSuKien: "Đêm nhạc Acoustic Mùa Thu",
        moTa: "Một đêm nhạc ấm cúng...",
        thoiGianBatDau: "2025-11-20T19:00:00",
        diaDiem: "Hội trường A",
        anhSuKienUrl: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=500&q=60",
        soLuongToiDa: 100,
        soLuongDaDangKy: 85, // Thêm trường này để test logic "Sắp hết chỗ"
        Club: { tenCLB: "CLB Guitar" }
      },
      {
        eventId: 2,
        tenSuKien: "Workshop: Kỹ năng Lập trình ReactJS",
        moTa: "Học cách xây dựng website hiện đại...",
        thoiGianBatDau: "2025-11-25T08:00:00",
        diaDiem: "Phòng Lab 3",
        anhSuKienUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=500&q=60",
        soLuongToiDa: 30,
        soLuongDaDangKy: 30, // Test trường hợp "Hết chỗ"
        Club: { tenCLB: "CLB IT" }
      }
        */ ];
    }
      

    // const response = await api.get('/events');
    // return response.data;
    },

  // Lấy chi tiết một sự kiện (sẽ dùng ở bước sau)
    getEventById: async (id) => 
    {
      // Tương tự, thử gọi API thật
    try 
    {
      const response = await api.get(`/events/${id}`);
      return response.data;
    } 

      catch (error) 
      {
        /*
      // Giả lập độ trễ mạng
      await new Promise(resolve => setTimeout(resolve, 500));
      //const response = await api.get(`/events/${id}`);
      //return response.data;

      const mockEvents = [
        {
          eventId: 1,
          tenSuKien: "Đêm nhạc Acoustic Mùa Thu",
          moTa: "Một đêm nhạc ấm cúng với những bản tình ca bất hủ. Đến với đêm nhạc, bạn sẽ được thưởng thức những giọng ca ngọt ngào đến từ các thành viên CLB, cùng với tiếng đàn guitar mộc mạc. Vé vào cửa miễn phí!",
          thoiGianBatDau: "2025-11-20T19:00:00",
          diaDiem: "Hội trường A",
          anhSuKienUrl: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=800&q=80", // Ảnh to hơn
          soLuongToiDa: 100,
          soLuongDaDangKy: 85,
          Club: { tenCLB: "CLB Guitar", logoUrl: "https://via.placeholder.com/50" }
        },
        {
          eventId: 2,
          tenSuKien: "Workshop: Kỹ năng Lập trình ReactJS",
          moTa: "Học cách xây dựng website hiện đại với React từ con số 0. Workshop phù hợp cho người mới bắt đầu.",
          thoiGianBatDau: "2025-11-25T08:00:00",
          diaDiem: "Phòng Lab 3",
          anhSuKienUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
          soLuongToiDa: 30,
          soLuongDaDangKy: 30, 
          Club: { tenCLB: "CLB IT", logoUrl: "https://via.placeholder.com/50" }
        }
      ];
      */
        throw error;
      }

    },

    // --- HÀM MỚI: Đăng ký tham gia ---
    registerEvent: async (eventId) => 
    {
    // Gọi API POST /api/events/:id/register
    const response = await api.post(`/events/${eventId}/register`);
    return response.data;
    }
    
      /*
      // Tìm kiếm trong mảng giả
      const event = mockEvents.find(e => e.eventId === parseInt(id));
      
      if (!event) throw new Error("Sự kiện không tồn tại");
      
      return event;  
    }
      */
};


export default eventService;