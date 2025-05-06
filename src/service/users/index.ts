import axiosClient from "@/config/axios"
import { baseApi } from "@/helper/constants"


export default class UsersService {
  async getInfo(){
    return await axiosClient.get(`${baseApi}/user/get`)
  }  

}