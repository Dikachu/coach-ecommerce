import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const AuthenticatedRoutes = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("ProtectedRoute must be used within AuthProvider");
  }

  return auth.user ? <Outlet /> : <Navigate to="/signin" replace />;
};
