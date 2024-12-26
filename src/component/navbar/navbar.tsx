import React from "react";
import "./navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faRotate, faShapes } from "@fortawesome/free-solid-svg-icons";
interface NavbarProps {
  isMobile: boolean; // Explicitly define the type of isMobile
}

const Navbar : React.FC<NavbarProps> = ({ isMobile })=> {
  return (
    <div className=" flex-col navbarside" style={{display:isMobile ? "none":"flex" }}> 
         {/* Ẩn logo khi đóng */}
      <nav
        className="navbar"
        style={{
          width:  "100%", // Thay đổi chiều rộng dựa trên trạng thái
        }}
      >
        <div   className="logo text-white">EzPDF</div>
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
