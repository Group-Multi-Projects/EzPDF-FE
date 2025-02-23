import { Button } from "@/component/ui/button";
import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { HTMLtoPDFResponse, convertFile } from "@/store/convert_slice";
import { useSelector } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import { SaveIcon } from "lucide-react";

const PdfToWord = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading_convert } = useSelector(
    (state: RootState) => state.convert
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isFile, setIsFile] = useState<File | null>(null);
  const [requestType, setRequestType] = useState<string>("");
  const [uploadedFileName, setUploadedFileName] = useState<string>("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setIsFile(file);
    if (file) {
      setUploadedFileName(file.name);
    }
  };

  const handleConvert = async () => {
    if (!isFile) {
      toast.error("No file uploaded!");
      return;
    }
    setIsFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // ✅ Reset input file
    }
    const now = new Date();
    const dateTime = now.toISOString().replace(/[:.-]/g, "_");
    const baseFileName = uploadedFileName.split(".")[0];
    const newFileName = `${baseFileName}_${dateTime}.docx`;

    setRequestType("pdf2word");
    const formData = new FormData();
    formData.append("file", isFile!); // Đảm bảo file không bị null
    formData.append("request_type", requestType);

    console.log("Sending formData:", formData);

    try {
      let res = await dispatch(convertFile(formData));
      const response = res.payload as HTMLtoPDFResponse;
      console.log("API Response:", response);

      if (isFile) {
        const fileUrl = response.output_file_url;

        const a = document.createElement("a");
        a.href = fileUrl;
        a.download = newFileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        toast.success("File converted and downloaded successfully!");
      } else {
        toast.error("Failed to get the file URL!");
        console.error("Response does not include output_file_url:", response);
      }
    } catch (error) {
      toast.error("Download failed!");
      console.error("Download failed:", error);
    }
  };

  return (
<div className="flex h-full w-full items-center justify-center">
  <div
    className={`flex flex-col items-center justify-center text-center w-[90%] h-auto p-12 border-2 border-dashed bg-white rounded-2xl shadow-lg
      ${isFile ? "border-purple-400" : "border-gray-400"}`}
    style={{
      maxHeight: isFile ? "300px" : "200px",
      opacity: isFile ? "1" : "0.7",
      transition: "max-height 0.5s ease, opacity 0.5s ease",
    }}
  >
    <div
      className={`w-full h-40 flex flex-col items-center justify-center border-2 border-dashed rounded-lg transition-all cursor-pointer 
        ${isFile ? "border-purple-300 bg-purple-50 hover:bg-purple-100" : "border-gray-300 bg-gray-50 hover:bg-gray-100"}`}
      onClick={() => fileInputRef.current?.click()}
    >
      {isLoading_convert ? (
        <LoadingButton
          loading
          style={{border:'none'}}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="outlined"
        >
          Uploading...
        </LoadingButton>
      ) : (
        <>
          <input
            type="file"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
            aria-label="Upload File"
          />
          <span className="font-semibold">
            {isFile ? (
              <span className="text-purple-600">Uploaded successfully!</span>
            ) : (
              <span className="text-gray-600">Drag & Drop or Click to Upload</span>
            )}
          </span>
        </>
      )}
    </div>

    {/* Hiển thị nút Convert chỉ khi có file */}
    <button
      className={`mt-6 px-6 py-3 bg-purple-500 text-white font-semibold rounded-lg shadow-md transition-all transform 
        ${isFile ? "hover:bg-purple-600 opacity-100 scale-100" : "opacity-50 scale-95 cursor-not-allowed"}`}
      style={{ transition: "opacity 0.5s ease, transform 0.5s ease" }}
      onClick={handleConvert}
      disabled={!isFile} // Vô hiệu hóa nút nếu không có file
    >
      Convert to Word
    </button>
  </div>
</div>

  );
};

export default PdfToWord;
