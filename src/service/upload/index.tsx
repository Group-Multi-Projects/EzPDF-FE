
import axios from "@/config/axios"

interface UploadProps {
    file:string,
    request_type:string
}


export const handleUploadApi = ({file, request_type}:UploadProps) =>{
    return axios.post("/upload/",{file, request_type})
}