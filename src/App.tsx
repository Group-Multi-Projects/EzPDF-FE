import { useState } from "react";
import PDFEditor from "./PDFEditor";
import PDFUploader from "./PDFUploader";
import AppRouter from "./router/AppRouter";
import { Toast } from "./toast";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
  };
  return (
    <div className="App">
      <AppRouter/>
      <Toast/>
      {/* <div>
      {!uploadedFile ? (
        <PDFUploader onFileUpload={handleFileUpload} />
      ) : (
        <PDFEditor file={uploadedFile} />
      )}
    </div> */}
    </div>
  )
}

export default App;
