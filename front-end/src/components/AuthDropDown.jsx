import React from "react";
import { Link } from "react-router-dom";

const AuthDropDown = () => {
  return (
    <>
      <Link to="/auth/signin" className="drops">
        <main className="px-3 bg-primary  py-1 rounded">
          <h1 className="text-light logout">Logout</h1>
        </main>
      </Link>
    </>
  );
};

export default AuthDropDown;
