import axiosClient from "@/config/axios"
import { baseApi } from "@/helper/constants"


export default class UsersService {
  async getInfo(){
    return await axiosClient.get(`${baseApi}/user/get`)
  }  
  async create(params:any){
    return await axiosClient.post(`${baseApi}/user/create`,params)
  }
  async update(params:any, userId:string|number){
    return await axiosClient.put(`${baseApi}/user/${userId}/update`,params)
  }
  async delete( userId:string|number){
    return await axiosClient.delete(`${baseApi}/user/${userId}/delete`)
  }
}