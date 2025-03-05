import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { HTMLtoPDFResponse, convertFile } from "@/store/convert_slice";
import { useSelector } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import { SaveIcon } from "lucide-react";
import pdf2word from '@/assets/svg/pdf2word.svg'
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
    <div className="flex flex-col gap-12 h-full w-full items-center justify-center p-6">
      {/* Khu vực Upload */}
      <div
        className={`flex flex-col items-center justify-center text-center w-[90%] h-auto p-12 border-2 border-dashed bg-white rounded-2xl shadow-lg transition-all
          ${isFile ? "border-purple-500 bg-purple-50" : "border-gray-400 bg-gray-100"}`}
        style={{
          maxHeight: isFile ? "320px" : "220px",
          opacity: isFile ? "1" : "0.8",
          transition: "max-height 0.5s ease, opacity 0.5s ease",
        }}
      >
        {/* Ô kéo thả */}
        <div
          className={`${isFile ? 'w-full' : 'px-4'} h-44 flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer transition-all 
            ${isFile ? "border-purple-400 bg-purple-100 hover:bg-purple-200" : "border-gray-300 bg-gray-50 hover:bg-gray-200"}`}
          onClick={() => fileInputRef.current?.click()}
        >
          {isLoading_convert ? (
            <LoadingButton
              loading
              style={{ border: "none" }}
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
              <span className="font-semibold text-lg">
                {isFile ? (
                  <span className="text-purple-600">Uploaded successfully!</span>
                ) : (
                  <span className="text-gray-700">Drag & Drop or Click to Upload</span>
                )}
              </span>
            </>
          )}
        </div>
  
        {/* Nút Convert */}
        <button
          className={`mt-6 px-6 py-3 text-lg font-semibold rounded-lg shadow-md transition-all transform 
            ${isFile ? "bg-purple-500 text-white hover:bg-purple-600 scale-100" : "bg-gray-300 text-gray-600 cursor-not-allowed opacity-60 scale-95"}`}
          style={{ transition: "opacity 0.5s ease, transform 0.5s ease" }}
          onClick={handleConvert}
          disabled={!isFile}
        >
          Convert to Word
        </button>
      </div>
  
      {/* Phần mô tả */}
      <div className="flex flex-col md:flex-row items-center justify-between w-[90%] gap-6 p-6">
        <div className="flex-shrink-0 bg-white shadow-2xl rounded-[12px]">
          <img src={pdf2word} alt="icon" className="min-h-[200px] w-auto " />
        </div>
        <div className="text-center md:text-left">
          <p className="text-lg font-medium text-gray-700 leading-relaxed">
            <span className="text-purple-600 font-semibold">#1 online PDF converter</span> on the internet!  
            100% free to convert your files from/to PDF.  
            No registration or installation required.  
            Start converting today!
          </p>
        </div>
      </div>
    </div>
  );
  
};

export default PdfToWord;
