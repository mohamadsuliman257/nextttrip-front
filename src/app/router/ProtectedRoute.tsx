import { Navigate } from "react-router-dom";
import { type ReactNode } from "react";
import  useAuthStore  from "@/features/auth/store/authStore";

type ProtectedRouteProps = {
  children: ReactNode;
  role: "user" | "guide" | "admin";
};

export default function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const user = useAuthStore((state) => state.user);

  if (!user) return <Navigate to="/login" />;

  if (user.role !== role) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}
