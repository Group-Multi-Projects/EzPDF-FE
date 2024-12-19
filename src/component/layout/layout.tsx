import React, { useState } from "react";
import Navbar from "../navbar/navbar";
import HeaderMenu from "../HeaderMenu/headerMenu";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true); // Trạng thái mở/đóng Navbar

  // Hàm toggle để mở/đóng Navbar
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={styles.container}>
      <Navbar isOpen={isOpen} toggleNavbar={toggleNavbar} />{" "}
      {/* Truyền state và toggle */}
      <div style={{ ...styles.content, marginLeft: isOpen ? "200px" : "0" }}>
        <HeaderMenu onToggleNavbar={toggleNavbar} isOpen={isOpen}></HeaderMenu>
        {children}
      </div>
    </div>
  );
};

// CSS cho Layout
const styles = {
  container: {
    display: "flex", // Bố trí theo chiều ngang
    width: "100%",
  },
  content: {
    padding: "0 0",
    transition: "margin-left 0.05s ease", // Hiệu ứng mượt khi Navbar mở/đóng
    width: "100%",
  },
  toggleButton: {
    marginTop: "10px",
    backgroundColor: "#0056b3",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default Layout;
