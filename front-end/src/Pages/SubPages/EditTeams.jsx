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
        <p>Edit has been successfully updated</p>
        <Button onClick={props.onHide}>Continue</Button>
      </Modal.Body>
    </Modal>
  );
}
const EditTeams = () => {
  const [modalShow, setModalShow] = React.useState(false);
  // Selected
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const [selectedTeamOption, setSelectedTeamOption] = useState("");

  const handleTeamChange = (event) => {
    setSelectedTeamOption(event.target.value);
  };
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
      <main className="mt-lg-5 container">
        <div className="mt-4">
          <h1 className="mb-4">Edit Team</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* 1 */}
            <div className="mb-5">
              <div className=" gap-5 mb-4">
                <div className="col-lg mb-3 mb-lg-0 w-100">
                  <label>Team Name</label>
                  <input
                    type="text"
                    placeholder="Product name"
                    className="w-100 input-employee"
                    {...register("generalFirst")}
                  />
                  <p className="text-danger">{errors.generalFirst?.message}</p>
                </div>
                <div className="col-lg w-100">
                  <label>Team Manager</label>
                  <select
                    name="gender"
                    id="gender"
                    className="input-employee w-100"
                    value={selectedTeamOption}
                    onChange={handleTeamChange}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="married">Option 1</option>
                    <option value="single">Option 2</option>
                    <option value="in a relationship">Option 2</option>
                  </select>
                </div>
              </div>
              <div className="col-lg w-100">
                <label>Team Members</label>
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
                  <option value="married">Option 1</option>
                  <option value="single">Option 2</option>
                  <option value="in a relationship">Option 2</option>
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

export default EditTeams;
