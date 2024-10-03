import React from "react";
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
        <h1>Created Successfully</h1>
        <p>Task has been created successfully!</p>
        <Button onClick={props.onHide}>Continue</Button>
      </Modal.Body>
    </Modal>
  );
}
const NewTask = () => {
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
      <main className="container mt-5">
        <h1>Create New Task</h1>
        <div className="mt-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* 1 */}
            <div className=" gap-5 mb-4">
              <div className="col-lg mb-3 mb-lg-0 w-100">
                <label>Task Title</label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  className="w-100 input-employee"
                  {...register("firstName")}
                />
                <p className="text-danger">{errors.firstName?.message}</p>
              </div>
              <div className="col-lg w-100">
                <label>Task Description</label>
                <textarea
                  type="text-area"
                  className="w-100 mt-3"
                  rows="5"
                  cols="50"
                />
              </div>
            </div>

            <div className="col-lg w-100 mb-4">
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
            {/* 3 */}
            <div className="d-md-flex gap-5 mb-2">
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
              <div className="col-lg mb-3 mb-lg-0 w-100">
                <label>Date of Birth</label>
                <input
                  type="date"
                  placeholder="Select Date"
                  className="w-100 input-employee"
                  {...register("generalFirst")}
                />
                <p className="text-danger">{errors.generalFirst?.message}</p>
              </div>
            </div>
            {/* 4 */}
            <div className="d-md-flex gap-5 mb-5">
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

export default NewTask;
