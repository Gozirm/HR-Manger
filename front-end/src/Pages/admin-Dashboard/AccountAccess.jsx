import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userAccount } from "../../lib/ValidationScheme";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import successIcon from "../../assets/Success Icon.svg";
import toast from "react-hot-toast";
import axios from "axios";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="text-center px-5 py-4">
        <img src={successIcon} alt="" />
        <h1>Saved Successfully</h1>
        <p>Employee has been successfully added</p>
        <Button onClick={props.onHide}>Continue</Button>
      </Modal.Body>
    </Modal>
  );
}
const AccountAccess = () => {
  const [personalInfo, setPersonalInfor] = useState(!true);
  const [professional, setProfessional] = useState(false);
  const [documents, setDocuments] = useState(false);
  const [accountAccess, setAccountAccess] = useState(!false);
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(userAccount),
  });
  const token = localStorage.getItem("hr-token");
  const onSubmit = async (data) => {
    console.log(data);
    // Save the password or perform other actions
    localStorage.setItem("userAccount", JSON.stringify(data));
    const personalInfo = JSON.parse(localStorage.getItem("personalInfo"));
    const professionalInfo = JSON.parse(localStorage.getItem("professional"));
    const salaryInfo = JSON.parse(localStorage.getItem("salary"));
    const finalPayload = new FormData();
    finalPayload.append("firstName", personalInfo?.firstName || "");
    finalPayload.append("lastName", personalInfo?.lastName || "");
    finalPayload.append("mobileNumber", personalInfo?.mobileNumber || "");
    finalPayload.append("email", personalInfo?.email || "");
    finalPayload.append("dateOfBirth", personalInfo?.dateOfBirth || "");
    finalPayload.append("maritalStatus", personalInfo?.maritalStatus || "");
    finalPayload.append("gender", personalInfo?.gender || "");
    finalPayload.append("address", personalInfo?.address || "");
    finalPayload.append("profileImage", personalInfo?.profileImage);
    finalPayload.append("jobTitle", professionalInfo?.jobTitle || "");
    finalPayload.append("department", professionalInfo?.department || "");
    finalPayload.append("role", professionalInfo?.role || "");
    finalPayload.append(
      "officeOfEmployment",
      professionalInfo?.officeOfEmployment || ""
    );
    finalPayload.append(
      "employmentStatus",
      professionalInfo?.employmentStatus || ""
    );
    finalPayload.append("salary", salaryInfo?.salary || 0);
    finalPayload.append("startDate", salaryInfo?.startDate || "");
    finalPayload.append("password", data?.password || "");
    finalPayload.append("confirmPassword", data?.confirmPassword || "");

    console.log("Final Payload:", finalPayload);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/signup",
        finalPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/admin-dashboard/employess");
      }
      console.log("Signup successful:", response.data);
      localStorage.removeItem("personalInfo");
      localStorage.removeItem("professionalInfo");
      localStorage.removeItem("salary");
      localStorage.removeItem("userAccount");
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.errMsg || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
      console.error("Signup error:", error);
    }

    reset();
  };
  // Selected
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const [selectedDepartmentOption, setSelectedDepartmentOption] = useState("");

  const handleDepartmentChange = (event) => {
    setSelectedDepartmentOption(event.target.value);
  };

  // =================================

  return (
    <>
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
              // onClick={() => {
              //   setPersonalInfor(!false);
              //   setProfessional(false);
              //   setDocuments(false);
              //   setAccountAccess(false);
              // }}
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
              //   setProfessional(!false);
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
                documents ? "active-link addEmploy" : "text-secondary addEmploy"
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
              to=""
              className={
                accountAccess
                  ? "active-link addEmploy"
                  : "text-secondary addEmploy"
              }
              onClick={() => {
                setAccountAccess(!false);
                setPersonalInfor(false);
                setProfessional(false);
                setDocuments(false);
              }}
            >
              Account Access
            </Link>
          </div>
        </div>
        <hr />
        <div className="mt-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* 1 */}
            <div className="mb-3">
              <div className="d-md-flex gap-5 mb-4">
                <div className="col-lg w-100">
                  <label>Password</label>
                  <input
                    type="text"
                    placeholder="Enter Password"
                    className="w-100 input-employee"
                    {...register("password")}
                  />
                  <p className="text-danger">{errors.password?.message}</p>
                </div>
              </div>
              {/* 3 */}
              <div className="d-md-flex gap-5 mb-5">
                <div className="col-lg mb-3 mb-lg-0 w-100">
                  <label>Confirm Password</label>
                  <input
                    type="text"
                    placeholder="Comfirm Password"
                    className="w-100 input-employee"
                    {...register("confirmPassword")}
                  />
                  <p className="text-danger">
                    {errors.confirmPassword?.message}
                  </p>
                </div>
              </div>
            </div>
            {/* end */}
            <div className="d-lg-flex gap-3 pb-4">
              <Link className="w-25" to="">
                <button className="cancel">Cancel</button>
              </Link>
              <button
                className="save mt-3 mt-lg-0"
                // onClick={() => setModalShow(true)}
                disabled={isSubmitting}
              >
                Save & Continue
              </button>
            </div>
            {/* <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            /> */}
          </form>
        </div>
      </main>
    </>
  );
};

export default AccountAccess;
