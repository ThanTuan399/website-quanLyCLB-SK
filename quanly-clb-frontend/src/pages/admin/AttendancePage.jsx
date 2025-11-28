import { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import registrationService from '../../services/registration.service';

const AttendancePage = () => {
  const [scanResult, setScanResult] = useState(null); // Lưu kết quả quét
  const [message, setMessage] = useState(''); // Lưu thông báo server trả về
  const [isProcessing, setIsProcessing] = useState(false); // Chặn quét liên tục

  // Hàm xử lý khi Camera bắt được mã QR
  const handleScan = async (result) => {
    if (isProcessing) return; // Nếu đang xử lý thì bỏ qua
    
    // Thư viện trả về mảng, lấy phần tử đầu tiên
    const rawValue = result?.[0]?.rawValue; 
    
    if (rawValue) {
      setIsProcessing(true); // Khóa lại
      setScanResult(rawValue);

      try {
        // 1. Phân tích dữ liệu JSON từ QR Code
        // Format QR từ Backend: { "u": userId, "e": eventId }
        const parsedData = JSON.parse(rawValue);
        
        const checkInData = {
          userId: parsedData.u,
          eventId: parsedData.e
        };

        // 2. Gọi API Điểm danh
        const response = await registrationService.checkInUser(checkInData);
        
        // 3. Thành công
        setMessage(`✅ ${response.message} - SV: ${response.student}`);
        playSound('success');

      } catch (error) {
        // 4. Thất bại
        console.error(error);
        setMessage(`❌ Lỗi: ${error.response?.data?.message || "Mã QR không hợp lệ"}`);
        playSound('error');
      } finally {
        // 5. Đợi 3 giây rồi cho phép quét tiếp
        setTimeout(() => {
            setIsProcessing(false);
            setMessage('');
            setScanResult(null);
        }, 3000);
      }
    }
  };

  // Hàm phát âm thanh vui tai (Tùy chọn)
  const playSound = (type) => {
    const audio = new Audio(
      type === 'success' 
        ? 'https://www.soundjay.com/buttons/sounds/button-3.mp3' // Tiếng 'Ting'
        : 'https://www.soundjay.com/buttons/sounds/button-10.mp3' // Tiếng 'Bíp' lỗi
    );
    audio.play().catch(e => console.log("Không thể phát âm thanh"));
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Máy Quét Điểm Danh</h1>

      <div className="bg-black rounded-lg overflow-hidden shadow-lg relative h-80">
        {/* Component Camera */}
        <Scanner 
            onScan={handleScan} 
            components={{ audio: false }}
            // 👇 THÊM DÒNG NÀY: Ép dùng camera trước (User) cho Laptop
            constraints={{ facingMode: 'user' }} 
        />

        
        
        {/* Khung ngắm đè lên camera */}
        <div className="absolute inset-0 border-2 border-blue-500 opacity-50 m-12 rounded-lg pointer-events-none"></div>
      </div>

      {/* Khu vực hiển thị kết quả */}
      <div className={`mt-6 p-4 rounded-lg text-center font-bold text-lg transition-all duration-300
        ${message.startsWith('✅') ? 'bg-green-100 text-green-700' : ''}
        ${message.startsWith('❌') ? 'bg-red-100 text-red-700' : ''}
        ${!message ? 'bg-gray-100 text-gray-500' : ''}
      `}>
        {message || "Đang chờ quét mã..."}
      </div>

      {isProcessing && (
        <p className="text-center text-sm text-gray-500 mt-2">Đang xử lý, vui lòng đợi...</p>
      )}

      {/* Hướng dẫn */}
      <div className="mt-8 text-sm text-gray-600">
        <h3 className="font-bold mb-2">Hướng dẫn:</h3>
        <ul className="list-disc pl-5 space-y-1">
            <li>Yêu cầu sinh viên mở vé QR trên điện thoại.</li>
            <li>Đưa mã QR vào khung xanh để quét.</li>
            <li>Giữ yên tay khi quét.</li>
        </ul>

      {/* --- NÚT TEST GIẢ LẬP (Dùng khi không có Camera) --- */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => {
              // Giả lập dữ liệu QR giống hệt format bạn tạo ở Backend: { u: userId, e: eventId }
              // Ví dụ: User ID 5 đăng ký Event ID 1
              const fakeQRData = JSON.stringify({ u: 5, e: 1 }); 
              
              // Gọi hàm xử lý như thật
              handleScan([{ rawValue: fakeQRData }]);
            }}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded shadow"
          >
            ⚠️ Test Quét (User 5 - Event 1)
          </button>
        </div>

      </div>
    </div>
  );
};

export default AttendancePage;