import React from "react";
import errorImg from "../assets/404 Error-rafiki.svg";
import "../Styles/Error.css";
const Error = () => {
  return (
    <>
      <main className="d-flex align-items-center justify-content-center text-center main-error container">
        <div>
          <img src={errorImg} alt="" className="errorImg" />
          <h1>Page Not Found</h1>
        </div>
      </main>
    </>
  );
};

export default Error;
