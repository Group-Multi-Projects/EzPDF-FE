import axiosClient from "@/config/axios"
import { baseApi } from "@/helper/constants"


export default class FilesService {
  async getList(){
    return await axiosClient.get(`${baseApi}/file/get`)
  }
  async upload(payload:FormData){
    return await axiosClient.post(`${baseApi}/file/upload`, payload)
  }
    async delete(fileId:any){
    return await axiosClient.delete(`${baseApi}/file/${fileId}/delete`)
  }   
}