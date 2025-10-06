// src/features/auth/slices/authSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
}

const token = localStorage.getItem("token");
const username = localStorage.getItem("username");

const initialState: AuthState = {
  isAuthenticated: !!token,
  username: username || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ username: string }>) {
      state.isAuthenticated = true;
      state.username = action.payload.username;
      localStorage.setItem("token", "demo-token");
      localStorage.setItem("username", action.payload.username);
    },
    signup(state, action: PayloadAction<{ username: string }>) {
      state.isAuthenticated = true;
      state.username = action.payload.username;
      localStorage.setItem("token", "demo-token");
      localStorage.setItem("username", action.payload.username);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.username = null;
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    },
  },
});

export const { login, signup, logout } = authSlice.actions;
export default authSlice.reducer;
