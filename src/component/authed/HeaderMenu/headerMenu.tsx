import "./header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faRotate, faShapes } from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { ArrowLeftFromLine, ArrowRightFromLine, ChartNoAxesGantt, CircleUser, FilePenLine, LogOut, PencilRuler, Repeat, Signature, UserCog } from "lucide-react";

interface HeaderProps {
  isMobile: boolean;
  isOpen: boolean;
  toggleNavbar: () => void;
}

const HeaderMenu: React.FC<HeaderProps> = ({ isMobile, isOpen, toggleNavbar }) => {
  return (
    <div className="flex test fixed-box" style={{ width: isMobile ? "100%" : "100%", paddingLeft: isMobile ? "0" : isOpen ? "0%" : "7%" }}>
      <header className="header">
        {/* Logo */}
        {!isMobile && (
          <button className="toggleButton" onClick={toggleNavbar}>
            {isOpen ? <ArrowRightFromLine color="white" /> : <ArrowLeftFromLine color="white" />}
          </button>
        )}
        
        {/* Dropdown với submenu */}
        {!isMobile && (
        <div className="btn-group">
  <button type="button" className="btn btn-secondary tools-button dropdown-toggle " data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
  <PencilRuler className="inline" /> Tools
  </button>
  <ul className="dropdown-menu dropdown-menu-lg-end">
    <li><button className="dropdown-item "  type="button"> <ChartNoAxesGantt className="inline mr-2" /> Arrange PDF files</button></li>
    <li><button className="dropdown-item" type="button"><FilePenLine className="inline mr-2"/> View and Edit PDF</button></li>
    <li><button className="dropdown-item" type="button"><Repeat className="inline mr-2" />PDF Conversion</button></li>
    <li><button className="dropdown-item" type="button"><Signature className="inline mr-2"/>Sign</button></li>

  </ul>
</div>)} ;

        {/* Offcanvas */}
        <div className="offcanvas offcanvas-start bg-black hidden" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <ul className="nav-links hidden">
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
                <FontAwesomeIcon className="mr-4" icon={faRotate} />
                Convert
              </a>
            </li>
          </ul>
        </div>

        {/* User Profile */}
        <div className="header-user">
          <CircleUser size={48} color="#000000" strokeWidth={2} />
          <div className="user-menu text-center">
            <a href="/profileDetal" className="user-menu-item"><UserCog className="inline mr-2"/>Account</a>
            <a href="/logout" className="user-menu-item"><LogOut className="inline mr-2"/> Logout</a>
          </div>
        </div>

        {/* Logo */}
        <div className="header-logo navbar-toggler">
          <img
            src="../../../../public/image.png"
            alt="Logo"
            className="logo-image"
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
