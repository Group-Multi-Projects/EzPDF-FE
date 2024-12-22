import React from "react";
import "./header.scss";
interface HeaderMenuProps {
    onToggleNavbar: () => void; // Hàm không có tham số, không trả về giá trị
    isOpen: boolean; // Biến boolean
  }
const HeaderMenu : React.FC<HeaderMenuProps> = ({ onToggleNavbar, isOpen }) => {
  return (
    <header className="header">
        <button   className="border-3  border-solid bg-gray-600 border-blue-600 text-white hover:bg-blue-600 hover:text-white hover:border-blue-800 p-2 px-4 rounded-md transition-all duration-300"
 onClick={onToggleNavbar}>
            {isOpen ? "<<" : ">>"} {/* Hiển thị nút phù hợp */}
        </button>
      {/* Logo */}
      <div className="header-logo">
        <img src="/assets/logo.png" alt="Logo" className="logo-image" />
        <span className="logo-text">EzPDF</span>
      </div>

      {/* Menu Items */}
      <nav className="header-menu">
        <a href="/" className="menu-item">
          Trang chủ
        </a>
        <div className="menu-dropdown">
          <button className="menu-item">
            Công cụ <span className="arrow">▼</span>
          </button>
          <div className="dropdown-menu">
            <a href="/sign" className="dropdown-item">Ký tên</a>
            <a href="/sort" className="dropdown-item">Sắp xếp</a>
            <a href="/edit" className="dropdown-item">Xem & Chỉnh sửa</a>
            <a href="/convert" className="dropdown-item">Chuyển đổi</a>
          </div>
        </div>
        <a href="/about" className="menu-item">
          Về chúng tôi
        </a>
      </nav>

      {/* User Profile */}
      <div className="header-user">
        <img src="/assets/user-avatar.png" alt="User Avatar" className="user-avatar" />
        <div className="user-menu">
          <a href="/account" className="user-menu-item">Account</a>
          <a href="/logout" className="user-menu-item">Logout</a>
        </div>
      </div>
    </header>
  );
};

export default HeaderMenu;
