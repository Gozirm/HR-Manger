import React from "react";
import { useAuth } from "./AuthProvider";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const RoleBasedRoute = ({ children, requiredRole }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!requiredRole.includes(user.role)) {
    const previousLocation = location.state?.from || "/";
    navigate(previousLocation);
    return;
  }
  return user ? children : <Navigate to="/" />;
};
export default RoleBasedRoute;
  