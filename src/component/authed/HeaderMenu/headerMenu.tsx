import React, { useEffect, useState } from "react";
import "./header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faForward, faHouse, faRotate, faShapes } from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
interface HeaderMenuProps {
    onToggleNavbar: () => void; // Hàm không có tham số, không trả về giá trị
    isOpen: boolean; // Biến boolean
  }
const HeaderMenu : React.FC<HeaderMenuProps> = ({ onToggleNavbar, isOpen }) => {
  const [isMobile, setIsMobile] = useState(false);
  // Hook to check screen width
  useEffect(() => {
    const handleResize = () => {

      setIsMobile(window.innerWidth <= 768); // Kiểm tra nếu chiều rộng nhỏ hơn hoặc bằng 768px
      // console.log(isMobile ,window.innerWidth ,"9")
    };

    window.addEventListener("resize", handleResize); // Lắng nghe sự thay đổi kích thước
    handleResize(); // Kiểm tra kích thước khi component mount

    return () => {
      window.removeEventListener("resize", handleResize); // Dọn dẹp event listener khi component unmount
    };
  }, []);

  return (
    <div className="flex">
    <button   className=" toggle_side_button border-solid bg-gray-600 border-blue-600 text-white hover:bg-blue-600 hover:text-white hover:border-blue-800 p-2 px-4  transition-all duration-300"
 onClick={onToggleNavbar}>
            {isOpen ? <FontAwesomeIcon icon={faBackward} />: <FontAwesomeIcon icon={faForward} />} {/* Hiển thị nút phù hợp */}
        </button>
    <header className="header">
        
      {/* Logo */}
      <div className="header-logo navbar-toggler"  >
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/LEGO_logo.svg/2048px-LEGO_logo.svg.png" alt="Logo" className="logo-image" data-bs-toggle={isMobile ? "offcanvas" : ""}
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"/>
        <span className="logo-text">EzPDF</span>
      </div>

      <div
      className="offcanvas offcanvas-start bg-black"
      tabIndex={-1}
      id="offcanvasNavbar"
      aria-labelledby="offcanvasNavbarLabel"
    >
      {/* Nội dung Offcanvas */}
       <ul className="nav-links">
              <li>
                  <a href="/home" className="link">
                  <FontAwesomeIcon className="mr-4" icon={faHouse} /> 
                    Home
                  </a>
                </li>
                <li>
                  <a href="/addShape" className="link">
                  <FontAwesomeIcon className="mr-4" icon={faShapes} /> 
                    Add Shape
                  </a>
                </li>
                <li>
                  <a href="/editPage" className="link">
                  <FontAwesomeIcon  className="mr-4" icon={faRotate} />
                    Convert
                  </a>
                </li>
              </ul>
    </div>

      {/* Menu Items */}
      <nav className="header-menu">
        <div className="menu-dropdown">
          {/* <button className="menu-item">
            Công cụ <span className="arrow">▼</span>
          </button>
          <div className="dropdown-menu">
            <a href="/sign" className="dropdown-item">Ký tên</a>
            <a href="/sort" className="dropdown-item">Sắp xếp</a>
            <a href="/edit" className="dropdown-item">Xem & Chỉnh sửa</a>
            <a href="/convert" className="dropdown-item">Chuyển đổi</a>
          </div> */}
        </div>
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
  </div>);
};

export default HeaderMenu;
