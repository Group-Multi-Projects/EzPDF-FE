import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { RootState, AppDispatch } from "@/store";
import { uploadFile, resetUploadState } from "@/store/upload_slice";

const Edit = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, data } = useSelector((state: RootState) => state.upload);

  const [requestType] = useState<string>("editfile");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      console.log("Please provide a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("request_type", requestType);

    try {
      await dispatch(uploadFile(formData)); // Gọi API ngay khi chọn file
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleReset = () => {
    dispatch(resetUploadState());
  };
  console.log("check data", data);

  return (
    <div className="p-10">
      <div className="flex items-center justify-center w-full">
        {!isLoading && data ? (
          <>
            <div>
              <style>{data.style}</style>
              <div dangerouslySetInnerHTML={{ __html: data.body }} />
            </div>
          </>
        ) : (
          <>
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
            >
              {isLoading ? (
                <LoadingButton
                  loading
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  variant="outlined"
                >
                  Uploading...
                </LoadingButton>
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <CloudUploadOutlinedIcon fontSize="large" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">Upload file here</p>
                </div>
              )}
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleFileChange} // Gọi API khi chọn file
              />
            </label>
          </>
        )}
      </div>
    </div>
  );
};

export default Edit;
