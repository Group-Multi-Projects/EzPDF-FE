import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import React from "react";
const Layout = React.lazy(() => import('@/component/authed/layout/layout'));
import { useSelector } from "react-redux";
import PDFEditor from "@/page/authed/edit/old/pdfEditor";
import HomePage from "@/page/authed/home/home";
import LandingPage from "@/page/landingPage";

import { RootState } from "@/store";
import CheckAuth from "@/component/atoms/checkauth";
import Edit from "@/page/authed/edit";

const AppRouter = () => {
  const { isAuthenticated, user } = useSelector((state:RootState) => state.auth);
  console.log('isAuth', isAuthenticated)
  console.log('user in app router', user)
  return (
    <Router>
<Routes>
        {/* Các tuyến đường không yêu cầu xác thực */}
        <Route path="/" element={<LandingPage />} />

        {/* Routes có bảo vệ xác thực */}
        <Route
          path="/*"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Routes>
                <Route
                  path="/home"
                  element={
                    <Layout>
                      <HomePage />
                    </Layout>
                  }
                />
                <Route
                  path="/edit"
                  element={
                    <Layout>
                      <Edit/>
                    </Layout>
                  }
                />
              </Routes>
            </CheckAuth>
          }
        />
      </Routes>

      
    </Router>
  );
};

export default AppRouter;
