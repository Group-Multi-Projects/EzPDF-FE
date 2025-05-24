import React, { ReactNode, useEffect, useState } from "react";
import SidebarRoot from "../navbar/navbar";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import bgImg from "@/assets/svg/ss.svg";
import { Menu } from "lucide-react";
import { Avatar } from "antd";
import { Outlet } from "react-router-dom";
interface LayoutProps {
  children: ReactNode;
}

const Layout = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen] = useState(false);
  const [toggled, setToggled] = React.useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  return (
    <div className={isAuthenticated ? "flex w-full h-screen z-50" : "hidden"}>
      <div className={isAuthenticated ? "fixed" : "hidden"}>
        <SidebarRoot
          onBackdropClick={() => setToggled(false)}
          toggled={toggled}
          breakPoint="md"
        />
        {isMobile && (
          <>
            <div className="bg-white z-10 flex justify-between items-center fixed right-0 left-0 px-3 h-16 shadow-lg">
              {isMobile ? (
                <Menu onClick={() => setToggled(!toggled)} size={18} />
              ) : (
                <div></div>
              )}
              <Avatar
                size={35}
                src="https://jbagy.me/wp-content/uploads/2025/03/anh-dai-dien-zalo-dep-1.jpg"
              />
            </div>
          </>
        )}
      </div>
      <div
        className={`transition-[margin] duration-250 ease-out w-full overflow-auto`}
        style={{
          marginLeft: isMobile ? "0px" : isSidebarOpen ? "" : "250px",
          paddingTop: isMobile ? "3.5rem" : "0px",
          backgroundColor: "#f5f0f5",
        }}
      >
        <div className={isMobile ? 'pt-12 h-full' : 'h-full'}>
          <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default Layout;
