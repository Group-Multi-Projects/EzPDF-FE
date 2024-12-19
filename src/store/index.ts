import { configureStore } from '@reduxjs/toolkit'
// ...
import openModalSlice from '@/store/client/login_register'
export const store = configureStore({
  reducer: {
    modalLogin_Signup: openModalSlice
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;