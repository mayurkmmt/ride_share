import React from "react";
import { getUserData } from "../utils/storageApi";
import { Navigate, Outlet } from "react-router";

interface ProtectedRouteProps {
  authRequired?: boolean;
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  authRequired = true,
  redirectPath = "/l",
}) => {
  const userData = getUserData();
  const isAuthenticated = !!userData;

  // If authentication is required and user is not logged in, redirect to login
  if (authRequired && !isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  // If authentication is not required (like login page) and user is logged in, redirect to dashboard
  if (!authRequired && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
