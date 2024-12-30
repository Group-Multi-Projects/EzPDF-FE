import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleConvertApi } from "@/service/convert";

export interface HTMLtoPDFResponse {
    file: string;
    created_at: string;
    account: number;
    ouput_file_url: string;
  }

// Interface cho trạng thái ban đầu
interface convertState {
  isLoading_convert: boolean;
  data_convert: HTMLtoPDFResponse |  null;
  error: {};
}

// Trạng thái ban đầu
const initialState:convertState = {
  isLoading_convert: false,
  data_convert: null,
  error: {},
};

// Async Thunk cho việc convert file
export const convertFile = createAsyncThunk<
HTMLtoPDFResponse, // Kiểu dữ liệu trả về từ API
FormData,       // Kiểu của tham số đầu vào (formdata_convert)
{ rejectValue: string } // Kiểu lỗi trả về nếu bị `reject`
>(
  "convert/convertFile",
  async (formData, thunkAPI) => {
    try {
      const response = await handleConvertApi(formData);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.message || "Failed to convert"
      );
    }
  }
);
// await handleConvertApi({ file, request_type });
// Tạo slice
const convertSlice = createSlice({
  name: "convert/download",
  initialState,
  reducers: {
    resetConvertState: (state) => {
      state.isLoading_convert = false;
      state.data_convert = null;
      state.error = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(convertFile.pending, (state) => {
        state.isLoading_convert = true;
        state.error = {};
      })
      .addCase(convertFile.fulfilled, (state, action) => {
        state.isLoading_convert = false;
        state.data_convert = action.payload;
        state.error = {};
      })
      .addCase(convertFile.rejected, (state, action) => {
        state.isLoading_convert = false;
        state.data_convert = null;
        state.error = action.payload || "File convert failed";
      });
  },
});

// Export các action
export const { resetConvertState } = convertSlice.actions;

// Export reducer
export default convertSlice.reducer;  