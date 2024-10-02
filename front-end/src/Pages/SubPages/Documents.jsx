import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "../../lib/ValidationScheme";
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
const Documents = () => {
  const [personalInfo, setPersonalInfor] = useState(!true);
  const [professional, setProfessional] = useState(false);
  const [documents, setDocuments] = useState(!false);
  const [accountAccess, setAccountAccess] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });
  const onSubmit = (data) => console.log(data);
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
              to=""
              className={
                documents ? "active-link addEmploy" : "text-secondary addEmploy"
              }
              onClick={() => {
                setDocuments(!false);
                setPersonalInfor(false);
                setProfessional(false);
                setAccountAccess(false);
              }}
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
            <div className="mb-5">
              <div className="d-md-flex gap-5 mb-4">
                <div className="col-lg mb-3 mb-lg-0 w-100">
                  <label>Amount</label>
                  <input
                    type="text"
                    placeholder="Product name"
                    className="w-100 input-employee"
                    {...register("generalFirst")}
                  />
                  <p className="text-danger">{errors.generalFirst?.message}</p>
                </div>
                <div className="col-lg w-100">
                  <label>Start Date</label>
                  <input
                    type="text"
                    placeholder="Enter Number"
                    className="w-100 input-employee"
                    {...register("generalSecond")}
                  />
                  <p className="text-danger">{errors.generalSecond?.message}</p>
                </div>
              </div>
              <div className="col-lg w-100">
                <label>Start Date</label>
                <input
                  type="text"
                  placeholder="Enter Email Address"
                  className="w-100 input-employee"
                  {...register("general")}
                />
                <p className="text-danger">{errors.general?.message}</p>
              </div>
            </div>
            {/* end */}
            <div className="d-lg-flex gap-3 pb-4">
              <Link className="w-25" to="">
                <button className="cancel">Cancel</button>
              </Link>
              <button className="save mt-3 mt-lg-0"onClick={() => setModalShow(true)}>Save & Continue</button>
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

export default Documents;
