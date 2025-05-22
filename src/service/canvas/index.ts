import axiosClient from "@/config/axios";
import { baseApi } from "@/helper/constants";

export default class CanvasService {
  async get(id?: string, page?:number) {
    return await axiosClient.get(`${baseApi}/canvas/get/${id}?page_canvas=${page}`);
  }
  async create(params: any) {
    return await axiosClient.post(`${baseApi}/canvas/create`, params);
  }
  async update(id:string|number, params: any ) {
    return await axiosClient.put(`${baseApi}/canvas/update/${id}`, params);
  } 
  async delete(id:string|number ) {
    return await axiosClient.delete(`${baseApi}/canvas/delete/${id}`);
  }    
}
