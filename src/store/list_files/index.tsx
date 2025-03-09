import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFilesList } from "@/service/filesList/filesList";
// Interface cho dữ liệu trả về từ API
export interface FileList {
    id: number;
    file: string;
    num_pages: number;
    file_format: string;
    created_at: string;
    trash: boolean;
    account: number;
  }

  export interface GetListFilesResponse {
    list_files: FileList[];
  }
  

// Interface cho trạng thái ban đầu
interface GetListFilesState {
  isLoadingListFiles: boolean;
  dataListFiles: GetListFilesResponse |  null;
  errorListFiles:null | string;
}

// Trạng thái ban đầu
const initialState:GetListFilesState = {
  isLoadingListFiles: false,
  dataListFiles: null,
  errorListFiles: null,
};

  export const GetListFiles = createAsyncThunk<
  GetListFilesResponse,
  string, // Kiểu dữ liệu trả về từ API
  { rejectValue: string } // Kiểu lỗi trả về nếu bị `reject`
  >(
    "get_list_files/files",
    async ( type , thunkAPI) => {
      try {
        const response = await getFilesList(type);     
        return response;
        console.log('list file',response)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (errorListFiles: any) {
        return thunkAPI.rejectWithValue(
          errorListFiles.response?.message || "Failed"
        );
      }
    }
  );
// await handleUploadApi({ file, request_type });
// Tạo slice
const GetListFilesSlice = createSlice({
  name: "getListFiles",
  initialState,
  reducers: {
    resetGetListFilesState: (state) => {
      state.isLoadingListFiles = false;
      state.dataListFiles = null;
      state.errorListFiles = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetListFiles.pending, (state) => {
        state.isLoadingListFiles = true;
        state.errorListFiles = null;
      })
      .addCase(GetListFiles.fulfilled, (state, action) => {
        state.isLoadingListFiles = false;
        state.dataListFiles = action.payload;
        state.errorListFiles = null;
        console.log('Upload successful, payload:', action.payload); // Log ra payload
      })
      .addCase(GetListFiles.rejected, (state, action) => {
        state.isLoadingListFiles = false;
        state.dataListFiles = null;
        state.errorListFiles = typeof action.payload === "string" ? action.payload : "File upload failed";
      });
  },
});

// Export các action
export const { resetGetListFilesState } = GetListFilesSlice.actions;

// Export reducer
export default GetListFilesSlice.reducer;
