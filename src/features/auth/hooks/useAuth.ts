// src/features/auth/hooks/useAuth.ts
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../store/store";
import type { AppDispatch } from "../../../store/store";
import { login, signup, logout } from "../slices/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  return {
    auth,
    loginUser: (username: string) => dispatch(login({ username })),
    signupUser: (username: string) => dispatch(signup({ username })),
    logoutUser: () => dispatch(logout()),
  };
};
