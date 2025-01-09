import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
const Layout = React.lazy(() => import("@/component/authed/layout/layout"));
import { useSelector } from "react-redux";
import HomePage from "@/page/authed/home/home";
import LandingPage from "@/page/landingPage";
import FilesList from "@/page/authed/fileslist/fileslist";
import  FilesListTrash from "@/page/authed/fileslisttrash/fileslisttrash";


import { RootState } from "@/store";
import CheckAuth from "@/component/atoms/checkauth";
import Edit from "@/page/authed/edit";
import ProfileDetail from "@/page/authed/Profile/profileDetail";

const AppRouter = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  console.log("isAuth", isAuthenticated);
  console.log("user in app router", user);
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
                      <Edit />
                    </Layout>
                  }
                />

                <Route
                  path="/fileslist"
                  element={
                    <Layout>
                      <FilesList />
                    </Layout>
                  }
                />

                <Route
                  path="/fileslisttrash"
                  element={
                    <Layout>
                      <FilesListTrash />
                    </Layout>
                  }
                />
                <Route
                  path="/profileDetal"
                  element={
                    <Layout>
                      <ProfileDetail />
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
