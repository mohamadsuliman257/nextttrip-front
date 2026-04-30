import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
  role: "user" | "guide" | "admin";
};

export default function ProtectedRoute({
  children,
  role,
}: ProtectedRouteProps) {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) return <Navigate to="/login" />;

  const user = JSON.parse(storedUser);

  if (role == user.role) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}
