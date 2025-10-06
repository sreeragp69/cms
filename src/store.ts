// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Infer types for useSelector and useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
