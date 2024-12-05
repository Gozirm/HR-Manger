import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./AuthProvider";
import Loader from "../Auth/Loader";

const PrivateRoute = ({children}) => {
  const { user, isLoading } = useContext(AuthContext);
  if (isLoading) {
    return <div className="vh-100 d-flex justify-content-center align-items-center"><Loader/></div>
  }
  return user ? children : <Navigate to="/" />;
};

export default PrivateRoute;
