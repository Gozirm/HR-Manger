import React from "react";
import backIcon from "../../assets/backIcon.svg";
import { useState } from "react";
import { formSchema } from "../../lib/ValidationScheme";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
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
        <h1>Added Successfully</h1>
        <p>Employee has been added to payroll</p>
        <Button onClick={props.onHide}>Continue</Button>
      </Modal.Body>
    </Modal>
  );
}
const AddPayroll = () => {
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
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
      <main className="mt-lg-5 container">
        <div className="d-flex align-items-center justify-content-between">
          <h1 className="mt-4">Add to Payroll</h1>
          <Link to="/admin-dashboard/payroll">
            <img src={backIcon} className="mt-4" />
          </Link>
        </div>
        <hr />
        {/*  */}
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* 1 */}
            <div className="col-lg w-100 mb-4">
              <label>Employee</label>
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
                <option value="1">Option 1</option>
                <option value="single">Option 2</option>
                <option value="in a relationship">Option 3</option>
              </select>
            </div>
            <div className=" gap-5 mb-4">
              <div className="col-lg mb-3 mb-lg-0 w-100">
                <label>Base Salary</label>
                <input
                  type="number"
                  placeholder="N0.00"
                  className="w-100 input-employee"
                  {...register("generalFirst")}
                />
                <p className="text-danger">{errors.generalFirst?.message}</p>
              </div>
            </div>
            <div className=" gap-5 mb-4">
              <div className="col-lg mb-3 mb-lg-0 w-100">
                <label>Allowance</label>
                <input
                  type="number"
                  placeholder="N0.00"
                  className="w-100 input-employee"
                  {...register("general")}
                />
                <p className="text-danger">{errors.general?.message}</p>
              </div>
            </div>
            <div className=" gap-5 mb-4">
              <div className="col-lg mb-3 mb-lg-0 w-100">
                <label>Deduction</label>
                <input
                  type="number"
                  placeholder="N0.00"
                  className="w-100 input-employee"
                  {...register("general")}
                />
                <p className="text-danger">{errors.general?.message}</p>
              </div>
            </div>
            <div className=" gap-5 mb-4">
              <div className="col-lg mb-3 mb-lg-0 w-100">
                <label>Tax</label>
                <input
                  type="number"
                  placeholder="0%"
                  className="w-100 input-employee"
                  {...register("generalSecond")}
                />
                <p className="text-danger">{errors.generalSecond?.message}</p>
              </div>
            </div>

            {/* end */}
            <div className="d-lg-flex gap-3">
              <Link className="w-25" to="">
                <button className="cancel">Cancel</button>
              </Link>
              <button
                className="save mt-3 mt-lg-0"
                onClick={() => setModalShow(true)}
              >
                Save
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

export default AddPayroll;
