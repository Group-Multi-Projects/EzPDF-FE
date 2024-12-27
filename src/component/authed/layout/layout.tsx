import React, { ReactNode, useEffect, useState } from "react";
import Navbar from "../navbar/navbar";
import HeaderMenu from "../HeaderMenu/headerMenu";
import "./layout.scss";

interface LayoutProps {
  children: ReactNode; // Định nghĩa kiểu cho children
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
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
  return (
    <div className="container-all">
    <Navbar isMobile ={isMobile} />
    <HeaderMenu isMobile={isMobile} />
    <div className="content" style={{marginLeft : isMobile? "0px":"10%",
      width : isMobile?"100%":"90%",
      marginTop : isMobile?"20%":"10%",
      
    }}>
      {children}
    </div>
  </div>
  );
};

export default Layout;
