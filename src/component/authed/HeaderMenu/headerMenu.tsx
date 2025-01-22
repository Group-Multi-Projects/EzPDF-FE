import "./header.scss";
import menubar from "@/assets/svg/menubar.svg";
import logoText from "@/assets/png/logoText.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChartNoAxesGantt,
  CircleUser,
  FilePenLine,
  LogOut,
  Repeat,
  Signature,
  RefreshCw,
  File,
  Trash2,
  User,
  UserCog,
  Menu,
  Home,
  Edit,
} from "lucide-react";

interface HeaderProps {
  isMobile: boolean;
  isOpen: boolean;
  toggleNavbar: () => void;
}
const menuItems = [
  {
    icon: <ChartNoAxesGantt strokeWidth={"1"} className="inline mr-2" />,
    label: "Arrange PDF files",
  },
  {
    icon: <FilePenLine strokeWidth={"1"} className="inline mr-2" />,
    label: "View and Edit PDF",
  },
  {
    icon: <Repeat strokeWidth={"1"} className="inline mr-2" />,
    label: "PDF Conversion",
  },
  {
    icon: <Signature strokeWidth={"1"} className="inline mr-2" />,
    label: "Sign",
  },
];

const navItems = [
  { path: "/home", label: "Home", icon: <Home className="inline mr-2" /> },
  { path: "/edit", label: "Edit", icon: <Edit className="inline mr-2" /> },
  {
    path: "/convert",
    label: "Convert",
    icon: <RefreshCw className="inline mr-2" />,
  },
  {
    path: "/fileslist",
    label: "Files List",
    icon: <File className="inline mr-2" />,
  },
  {
    path: "/fileslisttrash",
    label: "Trash",
    icon: <Trash2 className="inline mr-2" />,
  },
  {
    path: "/profileDetal",
    label: "Profile Detail",
    icon: <User className="inline mr-2" />,
  },
];
const HeaderMenu: React.FC<HeaderProps> = ({
  isMobile,
  isOpen,
  toggleNavbar,
}) => {
  return (
    <div
      className="flex test fixed-box"
      style={{
        width: isMobile ? "100%" : "100%",
        paddingLeft: isMobile ? "0" : isOpen ? "0%" : "7%",
      }}
    >
      <header className="header">
        {/* Logo */}
        {!isMobile && (
          <button className="toggleButton" onClick={toggleNavbar}>
            {isOpen ? (
              <Menu
                className="text-indigo-600 hover:text-indigo-800"
                size={30}
              />
            ) : (
              <ChevronLeft
                className="text-indigo-600 hover:text-indigo-800"
                size={30}
              />
            )}
          </button>
        )}

        {/* Dropdown với submenu */}
        {!isMobile && (
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-secondary tools-button dropdown-toggle "
              data-bs-toggle="dropdown"
              data-bs-display="static"
              aria-expanded="false"
            >
              Tools
            </button>
            <ul className="dropdown-menu dropdown-menu-lg-end">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <button className="dropdown-item" type="button">
                    {item.icon}
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {isMobile && (
          <div
            className="z-10 offcanvas offcanvas-start bg-black hidden"
            tabIndex={-1}
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <ul className="nav-links hidden">
              {navItems.map((item, index) => (
                <li
                  key={index}
                  className="mx-3 p-1 hover:bg-slate-700 rounded-lg"
                >
                  <Link to={item.path} className="link">
                    <span>
                      {item.icon}
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* User Profile */}
        <div className="header-user">
          <CircleUser size={30} color="#000000" strokeWidth={1} />
          <div className="user-menu text-center">
            <Link to="/profileDetal" className="user-menu-item">
              <UserCog className="inline mr-2" />
              Account
            </Link>
            <a href="/logout" className="user-menu-item">
              <LogOut className="inline mr-2" /> Logout
            </a>
          </div>
        </div>

        {/* Logo */}
        <div className="header-logo navbar-toggler">
          <img
            src={isMobile ? menubar : logoText}
            alt="Logo"
            className="h-10 w-10 p-[0.5rem] sm:p-[1px]"
            data-bs-toggle={isMobile ? "offcanvas" : ""}
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          />
        </div>
      </header>
    </div>
  );
};

export default HeaderMenu;
