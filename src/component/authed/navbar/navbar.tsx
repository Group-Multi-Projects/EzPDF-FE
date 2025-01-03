import React from "react";
import "./navbar.scss";
import { ArrowLeftRight, FolderOpenDot, House, Trash2, Ungroup } from "lucide-react";
interface NavbarProps {
  isMobile: boolean; // Explicitly define the type of isMobile
  isOpen :boolean; //
}

const Navbar : React.FC<NavbarProps> = ({ isMobile ,isOpen })=> {
  return (
    <div className=" flex-col navbarside" style={{display:isMobile ? "none":"flex" , marginLeft: isOpen?'-7%':'0' }}> 
         {/* Ẩn logo khi đóng */}
      <nav
        className="navbar"
        style={{
          width:  "100%", // Thay đổi chiều rộng dựa trên trạng thái
        }}
      >
        <div   className="logo"><img src="../../../../public/logo.png" alt=""style={{width:"60%"}}/></div>
        <ul className="nav-links">
        <li>
            <a href="/home" className="link">
            <House  size={20}  strokeWidth={3} />
              Home
            </a>
          </li>
          <li>
            <a href="/addShape" className="link">
            <Ungroup size={20}  strokeWidth={3} />
              Add Shape
            </a>
          </li>
          <li>
            <a href="/editPage" className="link">
            <ArrowLeftRight size={20}  strokeWidth={3} />
              Convert
            </a>
          </li>

          <li>
            <a href="/editPage" className="link">
            <Trash2   size={20}  strokeWidth={3} />
              Trash
            </a>
          </li>



          <li>
            <a href="/fileslist" className="link">
            <FolderOpenDot size={20}  strokeWidth={3} />
              Projects
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;