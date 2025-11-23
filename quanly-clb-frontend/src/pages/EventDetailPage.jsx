import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import eventService from '../services/event.service';

const EventDetailPage = () => 
{
  const { id } = useParams(); // Lấy ID từ URL
  const navigate = useNavigate();
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => 
    {
    const fetchEventDetail = async () => 
        {
            try 
            {
                const data = await eventService.getEventById(id);
                setEvent(data);
            } 
            catch (err) 
            {
                setError("Không tìm thấy sự kiện này.");
            } 
            finally 
            {
                setLoading(false);
            }
        };
    fetchEventDetail();
  }, [id]);

  if (loading) return <div className="text-center py-20">Đang tải thông tin...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!event) return null;

  const isFull = event.soLuongDaDangKy >= event.soLuongToiDa;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Ảnh bìa lớn */}
      <img 
        src={event.anhSuKienUrl} 
        alt={event.tenSuKien} 
        className="w-full h-64 object-cover"
      />

      <div className="p-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{event.tenSuKien}</h1>
            <p className="text-blue-600 font-medium flex items-center gap-2">
              Tổ chức bởi: {event.Club?.tenCLB}
            </p>
          </div>
          
          {/* Badge trạng thái chỗ ngồi */}
          <div className={`px-4 py-2 rounded-full text-sm font-bold ${isFull ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
            {isFull ? 'Đã hết chỗ' : 'Đang mở đăng ký'}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Thông tin chi tiết */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-600">
              <span className="font-bold">📅 Thời gian:</span>
              {new Date(event.thoiGianBatDau).toLocaleString('vi-VN')}
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <span className="font-bold">📍 Địa điểm:</span>
              {event.diaDiem}
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <span className="font-bold">👥 Số lượng:</span>
              {event.soLuongDaDangKy} / {event.soLuongToiDa} người
            </div>
          </div>

          {/* Nút hành động */}
          <div className="flex flex-col justify-center">
            <button 
              disabled={isFull}
              className={`w-full py-3 rounded-lg font-bold text-white transition
                ${isFull 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
                }`}
              onClick={() => alert("Chức năng đăng ký sẽ làm ở Bước 6!")}
            >
              {isFull ? 'Sự kiện đã đầy' : 'Đăng Ký Tham Gia Ngay'}
            </button>
            <p className="text-xs text-gray-500 text-center mt-2">
              * Bạn cần đăng nhập để đăng ký
            </p>
          </div>
        </div>

        <div className="mt-8 border-t pt-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Mô tả sự kiện</h3>
          <p className="text-gray-600 leading-relaxed whitespace-pre-line">
            {event.moTa}
          </p>
        </div>
        
        <button onClick={() => navigate(-1)} className="mt-8 text-blue-600 hover:underline">
          &larr; Quay lại danh sách
        </button>
      </div>
    </div>
  );
};

export default EventDetailPage;