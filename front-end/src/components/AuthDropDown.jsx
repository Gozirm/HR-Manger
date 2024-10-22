import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const AuthDropDown = () => {
  const { user, isLoading, logout } = useAuth();

  return (
    <>
      <Link to="/" className="drops">
        <main className="px-3 bg-primary  py-1 rounded animate__heartBeat">
          <h1 className="text-light logout " onClick={logout}>
            Logout
          </h1>
        </main>
      </Link>
    </>
  );
}; 

export default AuthDropDown;
