import {   Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "@/page/authed/home/home";
import LandingPage from "@/page/landingPage";
import FilesList from "@/page/authed/files/Files";
import { RootState } from "@/store";
import Convert from "@/page/authed/convert";
import PdfToWord from "@/page/authed/convert/PdfToWord"
import PrivateRouters from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Users from "@/page/authed/users/Users";
import FileDetail from "@/page/authed/fileDetail/FileDetail";
import ProfileDetail from "@/page/authed/Profile/profileDetail";
import { pdfjs } from "react-pdf";
import FileView from "@/page/authed/edit/FileView";

const AppRouter = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  return (
      <Routes>

        <Route path="/" element={<PublicRoute component={LandingPage} />} />
        <Route path="/file" element={<PrivateRouters component={FileDetail} />} />
        <Route path="/home" element={<PrivateRouters component={HomePage} />} />
        <Route path="/edit" element={<PrivateRouters component={FileView} />} />
        <Route path="/convert" element={<PrivateRouters component={Convert} />} />
        <Route path="/convert/pdf-to-word" element={<PrivateRouters component={PdfToWord} />} />
        <Route path="/filesList" element={<PrivateRouters component={FilesList} />} />
        <Route path="/users" element={<PrivateRouters component={Users} />} />
        <Route path="/profile-detail" element={<PrivateRouters component={ProfileDetail} />} />
        
      </Routes>
  );
};

export default AppRouter;
