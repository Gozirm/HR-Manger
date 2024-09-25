import React from "react";
import logo from "../assets/logo-svg.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { logInSchema } from "../lib/ValidationScheme";
import { Link } from "react-router-dom";
import "../Styles/ForgotPwd.css";
const ForgotPwd = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(logInSchema),
  });
  const onSubmit = (data) => console.log(data);
  return (
    <>
      <main className="sign-bg d-flex align-items-center justify-content-center">
        <div className="pwd-main">
          <div className="d-flex justify-content-center gap-2">
            <img src={logo} alt="" />
            <h2 className="h2-head pt-2">HR Manager</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="d-flex row">
            <div className="">
              <label className="pwd-label mt-5">Forgot password</label>
              <input
                className="input-pwd"
                type="email"
                placeholder="Enter your email address to rest your password."
                {...register("email")}
              />
              <p className="text-danger">{errors.email?.message}</p>
            </div>
            <Link to="/auth/checkemail">
              <button className="sign-in mt-4">Forgot Password</button>
            </Link>
          </form>
        </div>
      </main>
    </>
  );
};

export default ForgotPwd;
