import {   Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "@/page/authed/home/home";
import LandingPage from "@/page/landingPage";
import FilesList from "@/page/authed/fileslist/fileslist";
import  FilesListTrash from "@/page/authed/fileslisttrash/fileslisttrash";
import { RootState } from "@/store";
import Edit from "@/page/authed/edit";
import ProfileDetail from "@/page/authed/Profile/profileDetail";
import Convert from "@/page/authed/convert";
import PdfToWord from "@/page/authed/convert/PdfToWord"
import PrivateRouters from "./PrivateRoute";
import PublicRoute from "./PublicRoute";


const AppRouter = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  return (
      <Routes>
        <Route path="/" element={<PublicRoute component={LandingPage} />} />
        

        <Route path="/home" element={<PrivateRouters component={HomePage} />} />
        <Route path="/edit" element={<PrivateRouters component={Edit} />} />
        <Route path="/convert" element={<PrivateRouters component={Convert} />} />
        <Route path="/convert/pdf-to-word" element={<PrivateRouters component={PdfToWord} />} />
        <Route path="/filesList" element={<PrivateRouters component={FilesList} />} />
        <Route path="/trash" element={<PrivateRouters component={FilesListTrash} />} />
        <Route path="/profileDetail" element={<PrivateRouters component={ProfileDetail} />} />
        
      </Routes>
  );
};

export default AppRouter;
