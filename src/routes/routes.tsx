import { createBrowserRouter, redirect } from "react-router-dom";
import DashboardLayout from "../shared/layouts/DashboardLayout.tsx";
import LoginPage from "../features/auth/pages/LoginPage.tsx";
import AuthLayout from "../shared/layouts/AuthLayout.tsx";
import Home from "../features/home/Home.tsx";
import AboutUs from "../features/about-us/AboutUs.tsx";
import Career from "../features/career/Career.tsx";
import Contact from "../features/contact/Contact.tsx";
import Events from "../features/events/Events.tsx";
import Dashboard from "../features/dashboard/Dashboard.tsx";
import Course from "../features/course/Course.tsx";



// const checkAuth = () => {
//   const token = localStorage.getItem("token");
//   if (!token) {

//     throw redirect("/");
//   }
//   return true;
// };

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <AuthLayout />,
    children: [{ index: true, element: <LoginPage /> }],
  },

  {
    path: "/",
    element: <DashboardLayout />,
    // loader: checkAuth,
    children: [
      { path: "", index: true, element: <Dashboard /> },
      { path: "home", index: true, element: <Home /> },
      { path: "about-us", element: <AboutUs /> },
      { path: "career", element: <Career /> },
      { path: "contact-us", element: <Contact /> },
      { path: "course", element: <Course /> },
      { path: "events", element: <Events /> },
    
    ],
  },
]);
