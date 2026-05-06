import { Navigate } from "react-router-dom";
import useAuthStore from "@/features/auth/store/authStore";

import type { ReactNode } from "react";

export const GuestRoute = ({ children }: { children: ReactNode }) => {
  const user = useAuthStore((state) => state.user);

  // if (user) return <Navigate to="/" />;
  if (user?.role === "admin") return <Navigate to="/admin" />;
  if (user?.role === "guide") return <Navigate to="/guide" />;
  if (user?.role === "user") return <Navigate to="/user" />;

  return children;
};
