import React from "react";
import "./navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faRotate, faShapes } from "@fortawesome/free-solid-svg-icons";
import { HomeIcon } from "@heroicons/react/24/outline";
interface NavbarProps {
  isOpen: boolean; // Kiểu boolean cho trạng thái mở/đóng
}
const Navbar: React.FC<NavbarProps> = ({ isOpen = true })=> {
  return (
    <div className="flex flex-col navbarside">
      {isOpen && <div className="logo text-white">EzPDF</div>} {/* Ẩn logo khi đóng */}
      <nav
        className="navbar"
        style={{
          width: isOpen ? "200px" : "0px", // Thay đổi chiều rộng dựa trên trạng thái
        }}
      >
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
      </nav>
    </div>
  );
};

export default Navbar;
