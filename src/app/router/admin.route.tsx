import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../layout/admin/AdminLayout";
import AdminHomePage from "@/features/admin/home/pages/AdminHomePage";

const adminRoutes  = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute role="admin">
            <AdminHomePage />
          </ProtectedRoute>
        ),
      },
    ],
  }
];
export default adminRoutes;
