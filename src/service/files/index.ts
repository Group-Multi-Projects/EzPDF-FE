import axiosClient from "@/config/axios";
import { baseApi } from "@/helper/constants";

export default class FilesService {
  async getList() {
    return await axiosClient.get(`${baseApi}/file/get`);
  }
  async getById(id?: string) {
    return await axiosClient.get(`${baseApi}/file/get/${id}/user`);
  }  
  async getDetail(id?: string) {
    return await axiosClient.get(`${baseApi}/file/get/${id}`);
  }
  async upload(payload: FormData) {
    return await axiosClient.post(`${baseApi}/file/upload`, payload);
  }
  async delete(fileId: any) {
    return await axiosClient.delete(`${baseApi}/file/${fileId}/delete`);
  }
  async saveAll(payload: any) {
    return await axiosClient.post(`${baseApi}/file/save-all`, payload);
  }
  async getSaveAll() {
    return await axiosClient.get(`${baseApi}/file/save-all`)
    // return {
    //   EM: "Get objects successfully",
    //   EC: 0,
    //   DT: {
    //     file_id: 9,
    //     json_canvas: {
    //       version: "6.6.4",
    //       objects: [
    //         {
    //           type: "Triangle",
    //           version: "6.6.4",
    //           originX: "left",
    //           originY: "top",
    //           left: 423.8824,
    //           top: 61.0052,
    //           width: 100,
    //           height: 100,
    //           fill: "rgba(0, 255, 0, 0.5)",
    //           stroke: null,
    //           strokeWidth: 1,
    //           strokeDashArray: null,
    //           strokeLineCap: "butt",
    //           strokeDashOffset: 0,
    //           strokeLineJoin: "miter",
    //           strokeUniform: false,
    //           strokeMiterLimit: 4,
    //           scaleX: 1,
    //           scaleY: 1,
    //           angle: 0,
    //           flipX: false,
    //           flipY: false,
    //           opacity: 1,
    //           shadow: null,
    //           visible: true,
    //           backgroundColor: "",
    //           fillRule: "nonzero",
    //           paintFirst: "fill",
    //           globalCompositeOperation: "source-over",
    //           skewX: 0,
    //           skewY: 0,
    //         },
    //       ],
    //     },
    //     createdAt: "2025-05-17T07:04:13.000Z",
    //     updatedAt: "2025-05-17T07:04:13.000Z",
    //   },
    // };
  }
}
