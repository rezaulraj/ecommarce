import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({
  userRole,
  requiredRole,
  redirectPath = "/login",
}) => {
  if (userRole !== requiredRole) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />; // Render nested routes
};

export default ProtectedRoute;
