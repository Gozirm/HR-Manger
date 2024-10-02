import React from "react";
import { Outlet, Link, useMatch, useLoaderData } from "react-router-dom";
import { useState } from "react";
import { formSchema } from "../lib/ValidationScheme";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import iIcon from "../assets/i icon.svg";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import successIcon from "../assets/Success Icon.svg";
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
const PersonalInfo = () => {
  const [personalInfo, setPersonalInfor] = useState(true);
  const [professional, setProfessional] = useState(false);
  const [documents, setDocuments] = useState(false);
  const [accountAccess, setAccountAccess] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);

  const match = useMatch("/admin-dashboard/employess/personal-info");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });
  const onSubmit = (data) => console.log(data);
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const [selectedGenderOption, setSelectedGenderOption] = useState("");

  const handleGenderChange = (event) => {
    setSelectedGenderOption(event.target.value);
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
                    {...register("phoneNum")}
                  />
                  <p className="text-danger">{errors.phoneNum?.message}</p>
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
                    {...register("general")}
                  />
                  <p className="text-danger">{errors.general?.message}</p>
                </div>
                <div className="col-lg w-100">
                  <label>Marital Status </label>
                  <select
                    name="gender"
                    id="gender"
                    className="input-employee w-100"
                    value={selectedOption}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="1">Married</option>
                    <option value="single">Single</option>
                    <option value="in a relationship">In a relationship</option>
                  </select>
                </div>
              </div>
              {/* 4 */}
              <div className="d-md-flex gap-5 mb-4">
                <div className="col-lg mb-3 mb-lg-0 w-100">
                  <label>Gender</label>
                  <select
                    name="gender"
                    id="gender"
                    className="input-employee w-100"
                    value={selectedGenderOption}
                    onChange={handleGenderChange}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
                </div>
                <div className="col-lg w-100">
                  <label>Address</label>
                  <input
                    type="text"
                    placeholder="Select Address"
                    className="w-100 input-employee"
                    {...register("general")}
                  />
                  <p className="text-danger">{errors.general?.message}</p>
                </div>
              </div>
              <div className="d-flex row mb-3">
                <label className="">Thumnail</label>
                <p className="text-secondary">
                  <img src={iIcon} className="pb-1" />
                  This image will appear in the explore page, upload a square
                  size of 2mb.
                </p>

                <input type="file" className="custom-file-input" />
              </div>
              {/* end */}
              <div className="d-lg-flex gap-3 pb-4">
                <Link className="w-25" to="">
                  <button className="cancel">Cancel</button>
                </Link>
                <button
                  className="save mt-3 mt-lg-0"
                  onClick={() => setModalShow(true)}
                >
                  Save & Continue
                </button>
              </div>
              <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
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
