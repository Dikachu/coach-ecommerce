import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";

export const GuestRoute = () => {
  const useAuth = useContext(AuthContext);
  if (!useAuth) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  // If no user, send them to login
  return !useAuth.user ? <Outlet /> : <Navigate to="/" replace />;
};