import axios from '@/config/axios';
// Định nghĩa interface cho phản hồi
export interface File {
  id: number;
  file: string;
  num_pages: number;
  file_format: string;
  created_at: string;
  trash: boolean;
  account: number;
}

export interface GetListFilesResponse {
  list_files: File[];
}

export const getFilesList = (): Promise<GetListFilesResponse> => { 
  // Thực hiện yêu cầu GET với token trong header Authorization
  return axios.get("/get_list_files/files/", {
  });
};
