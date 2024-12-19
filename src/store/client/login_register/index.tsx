
import {  createSlice, PayloadAction } from "@reduxjs/toolkit";



const openModalSlice = createSlice({
  name: "modalLogin_Signup",
  initialState:{
    isOpenLogin: false,
    isOpenSignup: false
  },
  reducers: {
    setIsOpenLogin: (state, action:PayloadAction<boolean>) => {
      state.isOpenLogin = action.payload;
    },
    setIsOpenSignup: (state, action:PayloadAction<boolean>) => {
      state.isOpenSignup = action.payload;
    },
  },
});

export const { setIsOpenLogin, setIsOpenSignup } = openModalSlice.actions;

export default openModalSlice.reducer;