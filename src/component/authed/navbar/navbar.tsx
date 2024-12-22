import React from "react";

interface NavbarProps {
  isOpen: boolean;
  toggleNavbar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isOpen, toggleNavbar }) => {
  return (
    <nav
      style={{
        ...styles.navbar,
        width: isOpen ? "200px" : "0px", // Thay đổi chiều rộng dựa trên trạng thái
      }}
    >
      {isOpen && <div style={styles.logo}>MyApp</div>} {/* Ẩn logo khi đóng */}
      <ul style={styles.navLinks}>
        <li>
          <a href="/addShape" style={styles.link}>
            Add Shape
          </a>
        </li>
        <li>
          <a href="/editPage" style={styles.link}>
            Edit Page
          </a>
        </li>
        <li>
          <a href="/home" style={styles.link}>
            Home
          </a>
        </li>
      </ul>
    </nav>
  );
};

// CSS cho Navbar với kiểu React.CSSProperties
const styles: {
  navbar: React.CSSProperties;
  logo: React.CSSProperties;
  navLinks: React.CSSProperties;
  link: React.CSSProperties;
} = {
  navbar: {
    height: "100vh",
    backgroundColor: "#007bff",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    position: "fixed",
    top: 0,
    left: 0,
    transition: "width 0.05s ease", // Hiệu ứng mượt khi mở/đóng
    overflow: "hidden",
  },
  
  logo: {
    fontSize: "20px",
    fontWeight: "bold",
    margin: "20px 0",
  },
  navLinks: {
    listStyle: "none",
    padding: 0,
    marginTop: "20px",
    width: "100%",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    padding: "10px 0",
    textAlign: "center",
    display: "block",
  },
};

export default Navbar;
