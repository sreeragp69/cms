import { redirect } from "react-router-dom";
import { isAuthenticated } from "./auth";

export const requireAuth = () => {
  if (!isAuthenticated()) {
    throw redirect("/login"); // Redirect if not logged in
  }
  return true;
};
