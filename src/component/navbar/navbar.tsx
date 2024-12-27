import React from "react";
import "./navbar.scss";
import { ArrowLeftRight, House, Ungroup } from "lucide-react";
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
            <House size={20} color="#ffffff" strokeWidth={3} />
              Home
            </a>
          </li>
          <li>
            <a href="/addShape" className="link">
            <Ungroup size={20} color="#ffffff" strokeWidth={3} />
              Add Shape
            </a>
          </li>
          <li>
            <a href="/editPage" className="link">
            <ArrowLeftRight size={20} color="#ffffff" strokeWidth={3} />
              Convert
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
