import React, { useEffect } from "react";
import { Outlet, Link, useMatch, useLoaderData } from "react-router-dom";
import { useState } from "react";
import { personalInformation } from "../../lib/ValidationScheme";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import iIcon from "../../assets/i icon.svg";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const PersonalInfo = () => {
  const [personalInfo, setPersonalInfor] = useState(true);
  const [professional, setProfessional] = useState(false);
  const [documents, setDocuments] = useState(false);
  const [accountAccess, setAccountAccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();
  const match = useMatch("/admin-dashboard/employess/personal-info");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(personalInformation),
  });
  const onSubmit = (data) => {
    // Check if a file was selected
    if (data.profileImage && data.profileImage.length > 0) {
      const file = data.profileImage[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        // Convert the file to base64
        const base64Image = reader.result;

        const formDataWithImage = {
          ...data,
          profileImage: base64Image,
        };
        toast.success("Saved Successfully");
        localStorage.setItem("personalInfo", JSON.stringify(formDataWithImage));
        setSelectedOption("");
        setImagePreview(null);
        console.log("Saved to local storage:", formDataWithImage);
        navigate("/admin-dashboard/employess/personal-info/professional");
        reset();
      };
      reader.readAsDataURL(file);
    } else {
      console.error("No file selected");
    }
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setImageError("The file is too large (max 2MB)");
        setImagePreview(null);
        return;
      } else {
        setImageError("");
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {match ? (
        <main className="mt-3 container personal">
          <h1 className="fs-2">Add New Employee</h1>
          <h2 className="fs-4 mb-4">All Employees / Add New Employee</h2>
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center  gap-3">
              <Link
                to="/admin-dashboard/employess/personal-info"
                className={
                  personalInfo
                    ? "active-link addEmploy"
                    : "text-secondary addEmploy"
                }
                onClick={() => {
                  setPersonalInfor(!false);
                  setProfessional(false);
                  setDocuments(false);
                  setAccountAccess(false);
                }}
              >
                Personal Information
              </Link>
              <Link
                to="/admin-dashboard/employess/personal-info/professional"
                className={
                  professional
                    ? "active-link addEmploy"
                    : "text-secondary addEmploy"
                }
                // onClick={() => {
                //   setProfessional(false);
                //   setPersonalInfor(false);
                //   setDocuments(false);
                //   setAccountAccess(false);
                // }}
              >
                Professional
              </Link>
              <Link
                to="/admin-dashboard/employess/personal-info/documents"
                className={
                  documents
                    ? "active-link addEmploy"
                    : "text-secondary addEmploy"
                }
                // onClick={() => {
                //   setDocuments(!false);
                //   setPersonalInfor(false);
                //   setProfessional(false);
                //   setAccountAccess(false);
                // }}
              >
                Documents
              </Link>
              <Link
                to="/admin-dashboard/employess/personal-info/account-access"
                className={
                  accountAccess
                    ? "active-link addEmploy"
                    : "text-secondary addEmploy"
                }
                // onClick={() => {
                //   setAccountAccess(!false);
                //   setPersonalInfor(false);
                //   setProfessional(false);
                //   setDocuments(false);
                // }}
              >
                Account Access
              </Link>
            </div>
          </div>
          <hr />
          <div className="mt-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* 1 */}
              <div className="d-md-flex gap-5 mb-4">
                <div className="col-lg mb-3 mb-lg-0 w-100">
                  <label>First Name</label>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    className="w-100 input-employee"
                    {...register("firstName")}
                  />
                  <p className="text-danger">{errors.firstName?.message}</p>
                </div>
                <div className="col-lg w-100">
                  <label>Last Name</label>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    className="w-100 input-employee"
                    {...register("lastName")}
                  />
                  <p className="text-danger">{errors.lastName?.message}</p>
                </div>
              </div>
              {/* 2 */}
              <div className="d-md-flex gap-5 mb-4">
                <div className="col-lg mb-3 mb-lg-0 w-100">
                  <label>Mobile Number</label>
                  <input
                    type="number"
                    placeholder="Enter Number"
                    className="w-100 input-employee"
                    {...register("mobileNumber")}
                  />
                  <p className="text-danger">{errors.mobileNumber?.message}</p>
                </div>
                <div className="col-lg w-100">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter Email Address"
                    className="w-100 input-employee"
                    {...register("email")}
                  />
                  <p className="text-danger">{errors.email?.message}</p>
                </div>
              </div>
              {/* 3 */}
              <div className="d-md-flex gap-5 mb-4">
                <div className="col-lg mb-3 mb-lg-0 w-100">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    placeholder="Select Date"
                    className="w-100 input-employee"
                    {...register("dateOfBirth", { required: true })}
                  />
                  <p className="text-danger">{errors.dateOfBirth?.message}</p>
                </div>
                <div className="col-lg w-100">
                  <label>Marital Status </label>
                  <select
                    name="gender"
                    id="gender"
                    className="input-employee w-100"
                    {...register("maritalStatus")}
                  >
                    <option disabled selected>
                      Select
                    </option>
                    <option value="married">Married</option>
                    <option value="single">Single</option>
                    {/* <option value="in a relationship">In a relationship</option> */}
                  </select>
                  <p className="text-danger">{errors.maritalStatus?.message}</p>
                </div>
              </div>
              {/* 4 */}
              <div className="d-md-flex gap-5 mb-4">
                <div className="col-lg mb-3 mb-lg-0 w-100">
                  <label>Gender</label>
                  <select
                    id=""
                    className="input-employee w-100"
                    {...register("gender", { required: true })}
                    value={selectedOption}
                    // onChange={handleGenderChange}
                  >
                    <option selected disabled>
                      Select
                    </option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
                  <p className="text-danger">{errors.gender?.message}</p>
                </div>
                <div className="col-lg w-100">
                  <label>Address</label>
                  <input
                    type="text"
                    placeholder="Select Address"
                    className="w-100 input-employee"
                    {...register("address")}
                  />
                  <p className="text-danger">{errors.address?.message}</p>
                </div>
              </div>
              <div className="d-fle row mb-3 ">
                <label className="">Thumnail</label>
                <p className="text-secondary">
                  <img src={iIcon} className="pb-1 " />
                  This image will appear in the explore page, upload a square
                  size of 2mb.
                </p>
                <img
                  src={imagePreview || iIcon}
                  alt=""
                  style={{
                    maxWidth: "100px",
                    marginTop: "5px",
                    maxHeight: "21%",
                  }}
                />
                <input
                  required
                  type="file"
                  className="custom-file-input "
                  {...register("profileImage", { required: true })}
                  onChange={handleImageChange}
                />
                <p className="text-danger">{errors.profileImage?.message}</p>
                {imageError && <p className="text-danger">{imageError}</p>}
              </div>
              {/* end */}
              <div className="d-lg-flex gap-3 pb-4">
                {/* <Link className="w-25"> */}
                <button
                  className="cancel w-25"
                  onClick={() => {
                    reset();
                    setImagePreview(null);
                  }}
                >
                  Cancel
                </button>
                {/* </Link> */}
                <button className="save mt-3 mt-lg-0">Save & Continue</button>
              </div>
            </form>
          </div>
        </main>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersonalInfo;
