import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import MainLayout from './layouts/MainLayout'; 
import RegisterPage from './pages/RegisterPage'; 
import HomePage from './pages/HomePage';       
import EventDetailPage from './pages/EventDetailPage';
import ProfilePage from './pages/ProfilePage';

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

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
