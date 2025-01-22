import React from "react";
import "./navbar.scss";
import logo from "@/assets/png/logo.png";
import {
  ArrowLeftRight,
  FolderOpenDot,
  House,
  Trash2,
  Ungroup,
  FilePenLine,
} from "lucide-react";
import { Link } from "react-router-dom";
interface NavbarProps {
  isMobile: boolean; // Explicitly define the type of isMobile
  isOpen: boolean; //
}
const menuItems = [
  { path: "/home", icon: <House size={20} strokeWidth={1.5} color="white" />, label: "Home" },
  {
    path: "/edit",
    icon: <FilePenLine size={20} strokeWidth={1.5} />,
    label: "Edit",
  },
  {
    path: "/convert",
    icon: <ArrowLeftRight size={20} strokeWidth={1.5} />,
    label: "Convert",
  },
  {
    path: "/fileslisttrash",
    icon: <Trash2 size={20} strokeWidth={1.5} />,
    label: "Trash",
  },
  {
    path: "/fileslist",
    icon: <FolderOpenDot size={20} strokeWidth={1.5} />,
    label: "Projects",
  },
];
const Navbar: React.FC<NavbarProps> = ({ isMobile, isOpen }) => {
  return (
    <div
      className=" flex-col navbarside shadow-md"
      style={{
        display: isMobile ? "none" : "flex",
        marginLeft: isOpen ? "-7%" : "0",
      }}
    >
      {/* Ẩn logo khi đóng */}
      <nav
        className="navbar"
        style={{
          width: "100%", // Thay đổi chiều rộng dựa trên trạng thái
        }}
      >
        <div className="p-2">
          <img src={logo} alt="logo" className="h-16" />
        </div>
        <ul className="nav-links">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link to={item.path} className="link flex">
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
