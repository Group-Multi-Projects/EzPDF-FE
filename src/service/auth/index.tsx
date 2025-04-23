import axiosClient from "@/config/axios"
import { baseApi } from "@/helper/constants"


export default class AuthService {
  async login(params:any){
    return await axiosClient.post(`${baseApi}/login`,params)
  }
  async register(params:any){
    return await axiosClient.post(`${baseApi}/register`,params)
  }
  async getInfo(){
    return await axiosClient.get(`${baseApi}/user/info`)
  }  
  async logout(){
   return await axiosClient.post(`${baseApi}/logout`)
  }
}