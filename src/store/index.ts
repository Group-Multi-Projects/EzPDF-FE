import { configureStore } from '@reduxjs/toolkit'
// ...
import openModalSlice from '@/store/client/login_register'
import authSlice from '@/store/auth_slice'
import uploadSlice from '@/store/upload_slice'
import convertSlice from './convert_slice'

export const store = configureStore({
  reducer: {
    modalLogin_Signup: openModalSlice,
    auth: authSlice,
    upload: uploadSlice,
    convert: convertSlice
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;