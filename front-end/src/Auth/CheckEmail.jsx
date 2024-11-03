import React from "react";
import "../Styles/Signin.css";
import logo from "../assets/logo-svg.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useParams, useNavigate } from "react-router-dom";
import eyeOpen from "../assets/visibility_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import eyeCLose from "../assets/visibility_off_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import { useState } from "react";
import { logInSchema, signinSchema } from "../lib/ValidationScheme";
import toast from "react-hot-toast";
import Loader from "./Loader";

const CheckEmail = () => {
  const [isClicked, setisClicked] = useState(false);
  const btnText = isClicked ? <Loader /> : "Reset Password";
  const navigate = useNavigate();
  const { resetToken } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signinSchema),
  });
  const [reveal, setReveal] = useState(false);
  const [revealPwd, setRevealPwd] = useState(false);
  const [image, setImage] = useState(eyeCLose);
  const [imagePwd, setimagePwd] = useState(eyeCLose);
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
  function handleRevealPwd() {
    if (revealPwd) {
      console.log("it's false");
      setRevealPwd(false);
      setimagePwd(eyeCLose);
    } else {
      console.log("It's True");
      setRevealPwd(true);
      setimagePwd(eyeOpen);
    }
  }
  const onSubmit = async (data) => {
    setisClicked(true);
    try {
      const req = await fetch(
        `http://localhost:4000/api/auth/resetpassword/${resetToken}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const res = await req.json();
      console.log(res);
      if (!res.success) {
        toast.error(res.message);
      }
      if (res.success) {
        toast.success(res.message);
        navigate("");
      }
    } catch (error) {
    } finally {
      setisClicked(false);
    }
  };
  return (
    <>
      <main className="sign-bg d-flex align-items-center justify-content-center">
        <div className="sign-main">
          <div className="d-flex justify-content-center gap-2">
            <img src={logo} alt="" />
            <h2 className="h2-head pt-2">HR Manager</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="d-flex row">
            <h2 className="mt-5">Reset Password</h2>
            <div className="my-2 ">
              <div className="pass">
                <input
                  className="input-signin"
                  type={reveal ? "text" : "password"}
                  {...register("password")}
                  placeholder="Enter New Password"
                />
                <p className="text-danger">{errors.password?.message}</p>
                <img onClick={handleReveal} src={image} className="pass-icon" />
              </div>
              <div className="pass mt-5">
                <input
                  className="input-signin"
                  type={revealPwd ? "text" : "password"}
                  {...register("confirmPwd")}
                  placeholder="Confirm Password"
                />
                <p className="text-danger">{errors.confirmPwd?.message}</p>
                <img
                  onClick={handleRevealPwd}
                  src={imagePwd}
                  className="pass-icon"
                />
              </div>
              <button className="sign-in mt-4" disabled={isSubmitting}>
                {btnText}
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default CheckEmail;
