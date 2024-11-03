import React from "react";
import logo from "../assets/logo-svg.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import Loader from "./Loader";
import { forgotPwdSchema } from "../lib/ValidationScheme";
import { Link } from "react-router-dom";
import "../Styles/ForgotPwd.css";
import axios from "axios";
import toast from "react-hot-toast";
const ForgotPwd = () => {
  const [isClicked, setisClicked] = useState(false);
  const btnText = isClicked ? <Loader /> : "Forgot Password";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(forgotPwdSchema),
  });

  const onSubmit = async (data) => {
    setisClicked(true);
    try {
      const req = await fetch("http://localhost:4000/api/auth/forgotpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await req.json();
      console.log(res);
      if (!res.success) {
        toast.error(res.errMsg);
      }
      if (res.success) {
        toast.success(res.message);
      }
    } catch (error) {
    } finally {
      setisClicked(false);
    }
  };

  // const onSubmit = async (data) => {
  //   setisClicked(true);

  //   try {
  //     const res = await axios.post(
  //       "http://localhost:4020/api/auth/forgotpassword",
  //       data
  //     );
  //     console.log(res);
  //     if (!res.data.success) {
  //       toast.error(res.data.errMsg);
  //     }
  //     if (res.data.success) {
  //       toast.success(res.data.message);
  //     }
  //   } catch (error) {
  //   } finally {
  //     setisClicked(false);
  //   }
  // };
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
            <button
              className={`sign-in mt-4 ${
                isClicked && "bg-secondary border-none"
              }`}
              type="submit"
              disabled={isSubmitting}
            >
              {btnText}
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default ForgotPwd;