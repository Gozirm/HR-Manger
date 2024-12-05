import React from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { Circles } from "react-loader-spinner";
export const Loader = () => {
  return (
    <>
      {/* <Spinner animation="grow" /> */}

      <Circles
        height="50"
        width="50"
        color="#3439CA"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        
      />
    </>
  );
};

export default Loader;
