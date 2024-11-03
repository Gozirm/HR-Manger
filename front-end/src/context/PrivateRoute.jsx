import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./AuthProvider";

const PrivateRoute = ({children}) => {
  const { user, isLoading } = useContext(AuthContext);
  if (isLoading) {
    return <div>Loading..</div>;
  }
  return user ? children : <Navigate to="/" />;
};

export default PrivateRoute;
