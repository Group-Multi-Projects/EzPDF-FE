import React, { ReactNode, useEffect, useState } from "react";
import Navbar from "../navbar/navbar";
import HeaderMenu from "../HeaderMenu/headerMenu";
import "./layout.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
interface LayoutProps {
  children: ReactNode; // Định nghĩa kiểu cho children
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(true);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };
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
    <div className="container-all">
      <div className={isAuthenticated ? "" : "hidden"}>
        <Navbar isMobile={isMobile} isOpen={isNavbarOpen} />
        <HeaderMenu
          isMobile={isMobile}
          isOpen={isNavbarOpen}
          toggleNavbar={toggleNavbar}
        />
      </div>
      <div
        className={`p-0 transition-[margin] duration-250 ease-out w-full  ${isAuthenticated && `ml-[5%] mt-[5%]`}`}
        style={{
          marginLeft: isMobile ? "0px" : isNavbarOpen ? "" : "7%",
          marginTop: isMobile ? "20%" : "",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
