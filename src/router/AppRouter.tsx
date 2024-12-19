import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
        <Route path="/editPage" element={<PDFEditor/>} />
      </Routes>
    </Router>
    )
}
export default AppRouter