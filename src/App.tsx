import AppRouter from "./router/AppRouter";
import { Toast } from "./toast";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./store/auth_slice";
import Layout from "./component/layout/main/layout";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import './App.scss'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicRoute from "./router/PublicRoute";
import PrivateRouters from "./router/PrivateRoute";
import LandingPage from "./page/landingPage";
import HomePage from "./page/authed/home/home";
import FileView from "./page/authed/edit/FileView";
import Convert from "./page/authed/convert";
import PdfToWord from "./page/authed/convert/PdfToWord";
import FilesList from "@/page/authed/files/Files";
import Users from "./page/authed/users/Users";
import ProfileDetail from "./page/authed/Profile/profileDetail";
import FileDetail from "./page/authed/files/FileDetail";
import ConvertFormat from "./page/authed/convert/ConvertFormat";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(setUser()); // Cập nhật user khi auth thay đổi
  }, [dispatch, isAuthenticated]); // Theo dõi isAuthenticated

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoute component={LandingPage} />} />
        <Route path="/filesList/:id" element={<FileDetail />} />
        
        <Route element={<Layout/>}>

        <Route path="/edit" element={<PrivateRouters component={FileView} />} />
        <Route path="/convert" element={<PrivateRouters component={ConvertFormat} />} />
        <Route path="/convert/pdf-to-word" element={<PrivateRouters component={PdfToWord} />} />
        <Route path="/filesList" element={<PrivateRouters component={FilesList} />} />
        
        <Route path="/users" element={<PrivateRouters component={Users} />} />
        <Route path="/profile-detail" element={<PrivateRouters component={ProfileDetail} />} />
        <Route path="/home" element={<PrivateRouters component={HomePage} />} />
        </Route>

      </Routes>
      </BrowserRouter>
     <Toast />     
    </div>
  );
}

export default App;
