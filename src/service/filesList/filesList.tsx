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

export const getFilesList = (type :string): Promise<GetListFilesResponse> => { 
  // Thực hiện yêu cầu GET với token trong header Authorization
  const url = type === "trash" ? "/get_list_files/trash" : "/get_list_files/files";  // Điều chỉnh URL theo type

  return axios.get(url);
};
