import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleUploadApi } from "@/service/upload";
// Interface cho dữ liệu trả về từ API
export interface UploadResponse {
  file: string;
  created_at: string;
  account: number;
  html_content: string;
  ouput_file_url: string;
}


// Interface cho trạng thái ban đầu
interface UploadState {
  isLoading: boolean;
  data: UploadResponse |  null;
  error:null | string;
}

// Trạng thái ban đầu
const initialState:UploadState = {
  isLoading: false,
  data: null,
  error: null,
};

// Async Thunk cho việc upload file
export const uploadFile = createAsyncThunk<
UploadResponse, // Kiểu dữ liệu trả về từ API
FormData,       // Kiểu của tham số đầu vào (formData)
{ rejectValue: string } // Kiểu lỗi trả về nếu bị `reject`
>(
  "upload/uploadFile",
  async (formData, thunkAPI) => {
    try {
      const response = await handleUploadApi(formData);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.message || "Failed to upload"
      );
    }
  }
);
const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    resetUploadState: (state) => {
      state.isLoading = false;
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.isLoading = false;
        state.data = null;
        state.error = action.payload || "File upload failed";
      });
  },
});

// Export các action
export const { resetUploadState } = uploadSlice.actions;

// Export reducer
export default uploadSlice.reducer;
