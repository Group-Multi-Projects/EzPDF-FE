import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AddShape } from "@/component/addShape/addShape";
import IndexPage from "@/page/index/IndexPage";
import PDFEditor from "@/page/edit/pdfEditor";

const AppRouter = () =>{
    return(
    <Router>
        <Routes>
        <Route path="/" element={<Navigate to="/indexPage" />} />
        <Route path="/addShape" element={<AddShape />} />
        <Route path="/indexPage" element={<IndexPage/>} />
        <Route path="/editPage" element={<PDFEditor/>} />
      </Routes>
    </Router>
    )
}
export default AppRouter