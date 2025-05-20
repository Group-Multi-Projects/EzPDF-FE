import axiosClient from "@/config/axios";
import { baseApi } from "@/helper/constants";

export default class CanvasService {
  async get(id?: string) {
    return await axiosClient.get(`${baseApi}/canvas/get/${id}`);
  }
  async create(params: any) {
    return await axiosClient.post(`${baseApi}/canvas/create`, params);
  }
}
