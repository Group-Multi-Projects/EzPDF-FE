
import axios from "@/config/axios"
import { UploadResponse } from "@/store/upload_slice";



export const handleUploadApi = (formData:FormData): Promise<UploadResponse> =>{
    return axios.post("/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
}


