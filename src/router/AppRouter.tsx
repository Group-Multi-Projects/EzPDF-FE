import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Layout from "@/component/layout/layout";
import { AddShape } from "@/component/addShape/addShape";
import Login from "@/page/login";
import PDFEditor from "@/page/edit/pdfEditor";
import HomePage from "@/page/home/home";

import Signup from "@/page/signup";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Routes không có Layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Routes có Layout */}
        <Route 
          path="/" 
          element={
            <Layout>
              <Navigate to="/addShape" />
            </Layout>
          } 
        />
        <Route 
          path="/addShape" 
          element={
            <Layout>
              <AddShape />
            </Layout>
          } 
        />
        <Route 
          path="/editPage" 
          element={
            <Layout>
              <PDFEditor />
            </Layout>
          } 
        />

        <Route 
          path="/home" 
          element={
            <Layout>
              <HomePage />
            </Layout>
          } 
        />
      </Routes>
      
    </Router>
  );
};

export default AppRouter;
