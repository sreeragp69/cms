import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../shared/layouts/DashboardLayout.tsx";
import LoginPage from "../features/auth/pages/LoginPage.tsx";
import AuthLayout from "../shared/layouts/AuthLayout.tsx.tsx";
import Home from "../features/home/Home.tsx";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <AuthLayout />,
    children: [{ index: true, element: <LoginPage /> }],
  },

  {
    path: "/",
    element: <DashboardLayout />,
    children: [
        { path: "", element: <Home /> },
      //   { path: "posts/:id/edit", element: <PostEditPage /> },
    ],
  },
]);
