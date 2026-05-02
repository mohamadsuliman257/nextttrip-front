import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "@/features/home/HomePage";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import MainLayout from "../layout/main/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import guideRoutes from "./guide.route";
import adminRoutes from "./admin.route";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "/guide/dashboard",
        element: (
          <ProtectedRoute role="guide">
            <HomePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  ...guideRoutes,
  ...adminRoutes,
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
