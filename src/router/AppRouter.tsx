import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Layout from "@/component/layout/layout";
// import { AddShape } from "@/component/addShape/addShape";
import Login from "@/component/login";
import PDFEditor from "@/page/edit/pdfEditor";
import HomePage from "@/page/home/home";
import LandingPage from "@/page/landingPage";

import Signup from "@/component/signup";

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
              <LandingPage  />
          } 
        />
        {/* <Route 
          path="/addShape" 
          element={
            <Layout>
              <AddShape />
            </Layout>
          } 
        /> */}
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
{/* import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "@/component/login";
import PDFEditor from "@/page/edit/pdfEditor";
import Signup from "@/component/signup";
import LandingPage from "@/page/landingPage";
const AppRouter = () =>{
    return(
    <Router>
        <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/editPage" element={<PDFEditor/>} /> */}
      </Routes>
      
    </Router>
  );
};

export default AppRouter;
