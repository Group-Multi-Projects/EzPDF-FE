import { PRIMARY } from "@/helper/colors";
import "./styles.scss";
import { HomeData } from "./data";
import { Popover } from "antd";
import AdminDashboard from "@/component/specific/home/AdminDashboard";
import ClientDashboard from "@/component/specific/home/ClientDashboard";

const HomePage = () => {
  const role = localStorage.getItem("role");
  const renderPage = () => {
    switch (role) {
      case "admin":
        return <AdminDashboard />;
      case "client":
        return <ClientDashboard />;
      default:
        break;
    }
  };
  return (
    <div className="p-10 h-full overflow-auto ">
      <>{renderPage()}</>
    </div>
  );
};

export default HomePage;
