import React, { ReactNode, useEffect, useState } from "react";
import SidebarRoot from "../navbar/navbar";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import bgImg from '@/assets/svg/ss.svg'
import { Menu } from "lucide-react";
interface LayoutProps {
  children: ReactNode; // Định nghĩa kiểu cho children
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen] = useState(false);
  const [toggled, setToggled] = React.useState(false);
  // Hook to check screen width
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Kiểm tra nếu chiều rộng nhỏ hơn hoặc bằng 768px
      // console.log(isMobile ,window.innerWidth ,"9")
    };

    window.addEventListener("resize", handleResize); // Lắng nghe sự thay đổi kích thước
    handleResize(); // Kiểm tra kích thước khi component mount

    return () => {
      window.removeEventListener("resize", handleResize); // Dọn dẹp event listener khi component unmount
    };
  }, []);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  return (
    <div className={isAuthenticated ? "flex w-full h-screen" : "hidden"}>
      <div className={isAuthenticated ? "fixed" : "hidden"}>
        <SidebarRoot
          onBackdropClick={() => setToggled(false)}
          toggled={toggled}
          breakPoint="md"
        />
          {isMobile && (
          <>
            <div className="bg-white fixed right-0 left-0 p-3 shadow-lg">
              <Menu onClick={() => setToggled(!toggled)} size={18}/>
            </div>
          </>
        )}
      </div>
      <div
        className={`p-0 transition-[margin] duration-250 ease-out w-full h-screen overflow-y-scroll`}
        style={{
          marginLeft: isMobile ? "0px" : isSidebarOpen ? "" : "250px",
          paddingTop: isMobile ? '3.5rem' : "0px",
          backgroundColor: "#F3E5F5"
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
