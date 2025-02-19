
import axios from "@/config/axios"
import { HTMLtoPDFResponse } from "@/store/convert_slice";



export const handleConvertApi = (formData:FormData): Promise<HTMLtoPDFResponse> =>{
    return axios.post("/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },       
      });
      
}