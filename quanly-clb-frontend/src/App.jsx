import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import MainLayout from './layouts/MainLayout'; 
import RegisterPage from './pages/RegisterPage'; 
import HomePage from './pages/HomePage';       
import EventDetailPage from './pages/EventDetailPage';
import ProfilePage from './pages/ProfilePage';
import AdminLayout from './layouts/AdminLayout';
import DashboardPage from './pages/admin/DashboardPage';
import ClubManagerPage from './pages/admin/ClubManagerPage';
import AttendancePage from './pages/admin/AttendancePage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          {/* Đường dẫn công khai */}
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} /> 
          
          {/* Trang chủ */}
          <Route path="/" element={<MainLayout> <HomePage/> </MainLayout>} />

          {/* Thêm Route mới cho trang chi tiết. :id là tham số động */}
          <Route path="/events/:id" element={<MainLayout> <EventDetailPage /> </MainLayout>} />

          {/* Thêm Route Hồ sơ cá nhân */}
          <Route path="/profile" element={ <MainLayout> <ProfilePage /> </MainLayout>} />

          {/* --- KHU VỰC ADMIN --- */}
          {/* Mọi đường dẫn bắt đầu bằng /admin sẽ dùng AdminLayout */}
          <Route path="/admin" element={<AdminLayout />}>
            
          {/* Khi vào /admin/dashboard -> Hiển thị DashboardPage vào vị trí Outlet */}
            <Route path="dashboard" element={<DashboardPage />} />
            
          {/* Sau này sẽ thêm: */}
          { <Route path="clubs" element={<ClubManagerPage />} />}
            
          {/* Nếu vào /admin mà không gõ gì thêm, tự chuyển sang dashboard (Tùy chọn) */}
          <Route index element={<div className="p-4">Chào mừng Admin! Hãy chọn menu bên trái.</div>} />

          {/* THÊM DÒNG NÀY: */}
          <Route path="attendance" element={<AttendancePage />} />
          </Route>


        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
