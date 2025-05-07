import axiosClient from "@/config/axios"
import { baseApi } from "@/helper/constants"


export default class FilesService {
  async getList(){
    return await axiosClient.get(`${baseApi}/file/get`)
  }  
}