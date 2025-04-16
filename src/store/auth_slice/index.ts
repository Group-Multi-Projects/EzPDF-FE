/* eslint-disable @typescript-eslint/no-explicit-any */
import apiService from "@/service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";


  

const initialState = {
    isLoading: false,
    user: null as string | null, // Ban đầu không có thông tin người dùng
    isAuthenticated: false, // Ban đầu người dùng chưa xác thực
};
  

interface registerProps  { email: string; username: string; password: string; phone: string }

export const registerUser = createAsyncThunk(
    "/auth/register", // Tên action
    async ({ email, username, password, phone }: registerProps,thunkAPI) => {
       {
        try {
          const response = await apiService.auth.register({email, username, password, phone});
          if (response.data.EC == 0) {
            return { success: true, access: response.data };
          } else {
            return {message: response.data.EM};
          }
        } catch (error: any) {
          return thunkAPI.rejectWithValue(
            error.response?.data || "Signup failed"
          );
        }
      }
    }
  );


interface loginProps{valueLogin:string;valuePassword:string }
export const loginUser = createAsyncThunk(
  "/auth/signin",

  async ({ valueLogin,valuePassword}:loginProps, thunkAPI) => {
    {
        try {
          const response = await apiService.auth.login({valueLogin, valuePassword});
          if (response.data.EC == 0) {
            return { success: true, access: response.data };
          } else {
            return {message: response.data.EM};
          }
        } catch (error: any) {
          return thunkAPI.rejectWithValue(
            error.response?.data || "Login failed"
          );
        }
      }

  }
);


export const logoutUser = createAsyncThunk(
  "/account/logout",
  async () => {
    return new Promise(() => {
      // Xóa token khỏi cookie
      Cookies.remove("accessToken");
      location.reload();
    });
  }
);




const authSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setUser: (state) => {
        const token = Cookies.get("accessToken"); // Lấy token từ cookies
        if (token) {
          state.user = token;
          state.isAuthenticated = true; // Đánh dấu là đã đăng nhập
        } else {
          state.user = null;
          state.isAuthenticated = false; // Chưa đăng nhập
        }
     },
     logout(state) {
        state.user = null;
        state.isAuthenticated = false;
        Cookies.remove("accessToken"); // Xóa cookies khi đăng xuất
      }, 
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.access || null
        state.isAuthenticated = !!action.payload.access;
                // Tạo cookies với thời hạn 365 ngày
        Cookies.set("accessToken", action.payload.access || '', { expires: 365 });
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;

      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;

      });
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;