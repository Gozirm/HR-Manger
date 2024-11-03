import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { professionalInformation } from "../../lib/ValidationScheme";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import successIcon from "../../assets/Success Icon.svg";
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
const Professional = () => {
  const [personalInfo, setPersonalInfor] = useState(!true);
  const [professional, setProfessional] = useState(!false);
  const [documents, setDocuments] = useState(false);
  const [accountAccess, setAccountAccess] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(professionalInformation),
  });
  const onSubmit = (data) => console.log(data);

  // Selected
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const [selectedDepartmentOption, setSelectedDepartmentOption] = useState("");

  const handleDepartmentChange = (event) => {
    setSelectedDepartmentOption(event.target.value);
  };

  return (
    <>
      <main className="mt-3 container">
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
              to=""
              className={
                professional
                  ? "active-link addEmploy"
                  : "text-secondary addEmploy"
              }
              onClick={() => {
                setProfessional(!false);
                setPersonalInfor(false);
                setDocuments(false);
                setAccountAccess(false);
              }}
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
                <label>Office of Employment</label>
                <input
                  type="text"
                  placeholder="Enter"
                  className="w-100 input-employee"
                  {...register("professionalInformation")}
                />
                <p className="text-danger">{errors.professionalInformation?.message}</p>
              </div>
              <div className="col-lg w-100">
                <label>Job Title</label>
                <input
                  type="text"
                  placeholder="Enter Title"
                  className="w-100 input-employee"
                  {...register("jobTitle")}
                />
                <p className="text-danger">{errors.jobTitle?.message}</p>
              </div>
            </div>
            {/* 3 */}
            <div className="d-md-flex gap-5 mb-5">
              <div className="col-lg w-100 mb-3 mb-lg-0">
                <label>Department</label>
                <select
                  name="gender"
                  id="gender"
                  className="input-employee w-100"
                  {...register("department")}
                  value={selectedDepartmentOption}
                  onChange={handleDepartmentChange}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="Option 1">Option 1</option>
                  <option value="Option 2">Option 2</option>
                  <option value="Option 3">Option 3</option>
                </select>
                
                <p className="text-danger">{errors.department?.message}</p>
              </div>
              <div className="col-lg w-100">
                <label>Employee Status</label>
                <select
                  name="gender"
                  id="gender"
                  className="input-employee w-100"
                  {...register("employmentStatus")}
                  value={selectedOption}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="on-site">On-site</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                </select>
                <p className="text-danger">{errors.employmentStatus?.message}</p>
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
    </>
  );
};

export default Professional;