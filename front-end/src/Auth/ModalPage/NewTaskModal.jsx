import React from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useState, useEffect } from "react";
const NewTaskModal = (props) => {
  const [roles, setRole] = useState([]);
  const [title, setTitle] = useState("");
  const token = localStorage.getItem("token");
  const [selectedManager, setSelectedManager] = useState("");
  const [managerFirstName, setManagerFirstName] = useState("");
  const [managerLastName, setManagerLastName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const getRole = async () => {
    try {
      const req = await axios.get(
        "https://hr-manger.onrender.com/api/department/roles",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (req.data.user) {
        console.log(req.data.user);
        setRole(req.data.user);
      }
      if (!req) {
        console.log(error);
      }
    } catch (error) {}
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const newTeam = {
      name: title,
      managerFirstName,
      managerLastName,
    };
    try {
      setIsSubmitting(true);
      const req = await axios.post(
        "https://hr-manger.onrender.com/api/department/create",
        newTeam,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      props.onHide();
      if (req) {
        console.log(req);
      }
      if (!req) {
        console.log("Not Found");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleManagerChange = (e) => {
    const selected = e.target.value;
    setSelectedManager(selected);

    // Find the selected manager in the roles array
    const manager = roles.find((role) => role.fullName === selected);
    if (manager) {
      const [firstName, lastName] = manager.fullName.split(" ");
      setManagerFirstName(firstName);
      setManagerLastName(lastName);
    } else {
      setManagerFirstName("");
      setManagerLastName("");
    }
  };
  useEffect(() => {
    getRole();
  }, []);
  const btnText = isSubmitting ? "Checking..." : " Save & Continue";

  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h1>Create New Team</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <main>
            <div>
              <form onSubmit={onSubmit}>
                {/* 1 */}
                <div className="mb-">
                  <div className=" gap-5 mb-lg-4">
                    <div className="col-lg mb-3 mb-lg-0 w-100">
                      <label>Team Name</label>
                      <input
                        type="text"
                        placeholder="Product name"
                        className="w-100 input-employee"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div className="col-lg w-100">
                      <label>Team Manager</label>
                      <select
                        className="input-employee w-100"
                        value={selectedManager}
                        onChange={handleManagerChange}
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        {roles && roles.length > 0 ? (
                          roles.map((role) => (
                            <option key={role._id} value={role._id}>
                              {role.fullName}{" "}
                              {/* Assuming role has a fullName field */}
                            </option>
                          ))
                        ) : (
                          <option value="" disabled>
                            {roles ? "No roles available" : "Loading roles..."}
                          </option>
                        )}
                      </select>
                    </div>
                  </div>
                </div>
                {/* end */}
                <div className="d-lg-flex gap-5">
                  <button className="cancel w-lg-50 w-50">Cancel</button>
                  <button
                    className="save mt-3 mt-lg-0 w-lg-50 w-50"
                    type="submit"
                    disabled={setIsSubmitting}
                  >
                    {btnText}
                  </button>
                </div>
              </form>
            </div>
          </main>
        </Modal.Body>
      </Modal>{" "}
    </>
  );
};

export default NewTaskModal;
