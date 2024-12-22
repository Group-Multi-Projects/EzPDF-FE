import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

const Edit = () => {
  return (
    <div className=" p-10 ">
      <div>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  "
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <CloudUploadOutlinedIcon fontSize="large" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Upload file here
              </p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Edit;
