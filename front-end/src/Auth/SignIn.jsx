import React from "react";
import "../Styles/Signin.css";
import logo from "../assets/logo-svg.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import eyeOpen from "../assets/visibility_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import eyeCLose from "../assets/visibility_off_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import { useState } from "react";
import { logInSchema } from "../lib/ValidationScheme";
const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(logInSchema),
  });
  const onSubmit = (data) => console.log(data);
  const [reveal, setReveal] = useState(false);
  const [image, setImage] = useState(eyeOpen);
  function handleReveal() {
    if (reveal) {
      console.log("it's false");
      setReveal(false);
      setImage(eyeCLose);
    } else {
      console.log("It's True");
      setReveal(true);
      setImage(eyeOpen);
    }
  }
  const navigate = useNavigate();
  function handleNavigate() {
    if (handleSubmit(onSubmit)) {
      console.log("ERROR");
      navigate("/admin-dashboard");
    } else {
      console.log("Good");
    }
  }
  return (
    <>
      <main className="sign-bg d-flex align-items-center justify-content-center">
        <div className="sign-main">
          <div className="d-flex justify-content-center gap-2">
            <img src={logo} alt="" />
            <h2 className="h2-head pt-2">HR Manager</h2>
          </div>
          <h2 className="h2-body my-4">
            Welcome to HR Manager - Where Creativity Meets Opportunity!
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="d-flex row">
            <div className="">
              <label>Email</label>
              <input
                className="input-signin"
                type="email"
                placeholder="sandrawilliams@gmail.com"
                {...register("email")}
              />
              <p className="text-danger">{errors.email?.message}</p>
            </div>
            <div className="my-2 ">
              <div className="d-flex justify-content-between mb-2 mt-3">
                <label>Password</label>
                <Link to="/auth/forgotpassword">Forgot Password?</Link>
              </div>
              <div className="pass">
                <input
                  className="input-signin"
                  type={reveal ? "text" : "password"}
                  {...register("password")}
                />
                <p className="text-danger">{errors.password?.message}</p>
                <img onClick={handleReveal} src={image} className="pass-icon" />
              </div>
              <button className="sign-in mt-4" onClick={handleNavigate}>
                Sign In
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default SignIn;
