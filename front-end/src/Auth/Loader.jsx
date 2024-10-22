import React from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

export const Loader = () => {
  return (
    <>
      <Spinner animation="grow" /> 
    </>
  );
};

export default Loader;
