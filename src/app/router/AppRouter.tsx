import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "@/pages/home/HomePage";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
        <HomePage />
    ),
  },
  {
    path: "/login",
    element: (
        <LoginPage />
    ),
  },
  {
    path: "/register",
    element: (
        <RegisterPage />
    ),
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
