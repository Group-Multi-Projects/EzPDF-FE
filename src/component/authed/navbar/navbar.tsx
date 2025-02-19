
import { Sidebar, Menu, MenuItem, SubMenu, SidebarProps as ProSidebarProps } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import Cookies from "js-cookie";
import { FC } from 'react';
import { FaHome, FaTools,FaTrashAlt  } from "react-icons/fa";
import { TfiLayoutListThumbAlt } from "react-icons/tfi";
import { IoMdPerson } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { PRIMARY } from '@/helper/colors';
import logo from "@/assets/png/logo.png";
import bgNavbar from '@/assets/svg/bg_img.svg'
import { logoutUser } from '@/store/auth_slice';
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
//import imgSidebar from "@/assets/svg/anhtet.svg";
// Kế thừa toàn bộ thuộc tính của Sidebar từ react-pro-sidebar
interface SidebarProps extends ProSidebarProps {
  handleToggleSidebar?: () => void;
  handleCollapsedChange?: () => void;
}

const SidebarRoot: FC<SidebarProps> = ({
  image,
  collapsed,
  toggled,
  handleToggleSidebar,
  handleCollapsedChange,
  ...rest
}) => {
  const dispatch: AppDispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser()); // Dispatch action để logout
    Cookies.remove("accessToken"); // Xóa token khỏi cookie
  };

  return (
    <Sidebar
      className="h-[100vh] z-10"
      collapsed={collapsed}
      toggled={toggled}
      onBackdropClick={handleToggleSidebar}
       image={`${bgNavbar}`}
      {...rest}
    >
      <div className="my-6 flex px-2">
        <img src={logo} alt="logo" className="h-12 px-3" />
        <p
          style={{
            lineHeight: "48px",
            fontSize: "25px",
            fontWeight: 700,
            color: `${PRIMARY.MEDIUM}`,
          }}
        >
          Ez PDF
        </p>
      </div>
      <Menu
        menuItemStyles={{
          button: {
            padding: "10px 20px",
            fontWeight: 500,
            color: "#6b7280",
            [`&.active`]: {
              backgroundColor: `${PRIMARY.MEDIUM}`,
              color: "#fff",
              fontWeight: 700,
              borderRadius: "8px",
            },
            "&:hover": {
              backgroundColor: `${PRIMARY.LIGHT}`,
              color: "white",
            },
          },
        }}
      >
        <div className="mt-4 mb-2 px-6">
          <span className="text-xs text-slate-400 font-semibold">General</span>
        </div>
        <MenuItem icon={<FaHome size={16} />} component={<Link to="/home" />}>
          Home
        </MenuItem>
        <SubMenu label="Tools" icon={<FaTools size={16} />}>
          <MenuItem component={<Link to="/edit" />}>Edit</MenuItem>
          <MenuItem component={<Link to="#" />}>Convert</MenuItem>
        </SubMenu>
        <MenuItem
          icon={<TfiLayoutListThumbAlt size={18} />}
          component={<Link to="/filesList" />}
        >
          Projects
        </MenuItem>
        <div className="mt-4 mb-2 px-6">
          <span className="text-xs text-slate-400 font-semibold">Extra</span>
        </div>
        <MenuItem
          icon={<IoMdPerson size={18} />}
          component={<Link to="/profileDetail" />}
        >
          Account
        </MenuItem>
        <MenuItem
          icon={<FaTrashAlt size={18} />}
          component={<Link to="/trash" />}
        >
          Trash
        </MenuItem>
        <MenuItem icon={<MdLogout size={18} />} onClick={handleLogout}>
          Logout
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SidebarRoot;


