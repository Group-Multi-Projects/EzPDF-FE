import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AddShape } from "@/component/addShape/addShape";
import Login from "@/page/login";
import PDFEditor from "@/page/edit/pdfEditor";
import Signup from "@/page/signup";

const AppRouter = () =>{
    return(
    <Router>
        <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/addShape" element={<AddShape />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/editPage" element={<PDFEditor/>} />
      </Routes>
    </Router>
    )
}
export default AppRouter