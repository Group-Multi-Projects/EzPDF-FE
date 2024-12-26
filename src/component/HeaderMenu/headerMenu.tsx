import React from "react";
import "./header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faHouse, faRotate, faShapes } from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


interface HeaderProps {
  isMobile: boolean; // Explicitly define the type of isMobile
}

const HeaderMenu : React.FC<HeaderProps> = ({ isMobile }) => {
  

  return (
    <div className="flex fixed-box" style={{width: isMobile?"100%":"90%",marginLeft: isMobile?"0":"10%"}}>
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
