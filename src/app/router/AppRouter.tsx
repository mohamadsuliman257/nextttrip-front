import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "@/features/main/HomePage";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import MainLayout from "../layout/main/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import guideRoutes from "./guide.route";
import adminRoutes from "./admin.route";
import Forbidden from "./Forbidden";
import { GuestRoute } from "./GuestRoute";
import UserHomePage from "@/features/user/home/pages/UserHomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { 
        index: true, 
        element: <HomePage /> 
      },
      {
        path: "/about",
        element: <HomePage />,
      },
      {
        path: "/user",
        element: (
          <ProtectedRoute role="user">
            <UserHomePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  ...guideRoutes,
  ...adminRoutes,
  {
    path: "/login",
    element: (
      <GuestRoute>
        <LoginPage />
      </GuestRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <GuestRoute>
        <RegisterPage />
      </GuestRoute>
    ),
  },
  {
    path: "/unauthorized",
    element: <Forbidden />,
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
