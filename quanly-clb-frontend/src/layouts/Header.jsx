import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo / Tên trang web */}
        <Link to="/" className="text-xl font-bold hover:text-blue-200 transition">
          Student Clubs
        </Link>

        {/* Menu điều hướng */}
        <nav className="flex items-center gap-6">
          <Link to="/" className="hover:text-blue-200 transition">Trang chủ</Link>
          <Link to="/events" className="hover:text-blue-200 transition">Sự kiện</Link>
          
          {/* Khu vực hiển thị thông tin User */}
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/profile" className="font-medium hover:underline"> Chào, {user.hoTen} </Link>
              <button 
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm transition"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="bg-white text-blue-600 px-4 py-2 rounded font-medium hover:bg-blue-50 transition"
            >
              Đăng nhập
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;