import React, { useState, useEffect } from "react";
import { Employ } from "../../tables";
import Table from "react-bootstrap/Table";
import { Outlet, Link, useMatch } from "react-router-dom";
import addIcon from "../../assets/addIcon.svg";
import Loader from "../../Auth/Loader";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
const Employees = () => {
  const match = useMatch("/admin-dashboard/employess");
  const [employeesActive, setEmployeesActive] = useState(true);
  const [teamsActive, setTeamsActive] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("hr-token");

  const fetchEmployees = async () => {
    setLoading(true); //
    try {
      const response = await axios.get(
        `https://hr-manger.onrender.com/api/employee/users?page=${page}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.users);
      setEmployees(response.data.users);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError(err.response?.data.errMsg || "Error fetching employees");
    } finally {
      setLoading(false);
    }
  };
  // Pagination handlers
  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };
  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };
  const getEmployeeById = async (id) => {
    try {
      setLoading(true);
      const req = await axios.get(`https://hr-manger.onrender.com/api/employee/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(req.data.employee);

      setSelectedTask(req.data.employee);
      setShowModal(true);
    } catch (error) {
      setError("Error fetching task details");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleRowClick = (taskId) => {
    getEmployeeById(taskId);
  };
  useEffect(() => {
    fetchEmployees();
  }, [page]);
  if (loading)
    return (
      <div className="d-flex justify-content-center">
        <Loader />
      </div>
    );
  if (error) return <p>{error}</p>;
  return (
    <>
      {match ? (
        <main className="mt-lg-5 container">
          <h1 className="">Employees</h1>
          <p className="title">Dashboard/Employee</p>
          <div className="d-flex align-items-center justify-content-between gap-4">
            <div className="d-flex align-items-center gap-md-5 gap-3">
              <Link
                to="/admin-dashboard/employess"
                className={employeesActive ? "active-link" : "text-secondary"}
                onClick={() => {
                  setEmployeesActive(false);
                  setTeamsActive(!false);
                }}
              >
                All Employees
              </Link>
              <Link
                to="/admin-dashboard/employess/teams"
                className={teamsActive ? "active-link" : "text-secondary "}
                onClick={() => {
                  setEmployeesActive(!false);
                  setTeamsActive(!true);
                }}
              >
                Team
              </Link>
            </div>
            <Link to="/admin-dashboard/employess/personal-info">
              <button
                style={{
                  width: "100%",
                  color: "white",
                  backgroundColor: "#3439CA",
                  fontFamily: "Bricolage Grotesque, sans-serif",
                }}
                className="newEmployeebtn"
              >
                <img src={addIcon} className="me-1" />
                New Employee
              </button>
            </Link>
          </div>
          <hr />
          {/* Tables */}

          <div className="mt-5 border p-3 rounded-4">
            <div>
              <Table responsive="lg" hover role="button">
                <thead className="text-white">
                  <tr className="title-tr">
                    <th className="bg-light hastag">Name</th>
                    <th className="bg-light">Email</th>
                    <th className="bg-light">Team</th>
                    <th className="bg-light">Supervisor</th>
                    <th className="text-center bg-light action-1">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employe) => {
                    const {
                      _id,
                      firstName,
                      lastName,
                      email,
                      profileImage,
                      employmentStatus,
                      role,
                      department,
                    } = employe;
                    return (
                      <tr
                        key={_id}
                        className="title"
                        onClick={()=>{handleRowClick(_id)}}
                      >
                        <td>
                          <div className="d-flex gap-2 align-items-center">
                            <img
                              src={profileImage}
                              alt=""
                              className="profileImgIcon"
                            />
                            <p className="mt-3 ">{`${firstName} ${lastName}`}</p>
                          </div>
                        </td>
                        <td>
                          <p className="mt-3">{email}</p>
                        </td>
                        <td>
                          <p className="mt-3">{role}</p>
                        </td>
                        <td>
                          <p className="mt-3">
                            {department?.manager.firstName}{" "}
                            {department?.manager.lastName}{" "}
                          </p>
                        </td>
                        <td className="text-center pt-3 ">
                          <p
                            className={`action-statu mt-2 ${employmentStatus}`}
                          >
                            {employmentStatus}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              {/* Modal for Employee Details */}
              <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                centered
                size="lg"
              >
                <Modal.Header closeButton>
                  <Modal.Title>Employee’s Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {selectedTask ? (
                    <>
                      <p>
                        <strong>Title:</strong> {selectedTask?.address}
                      </p>
                      <p>
                        <strong>Status:</strong> {selectedTask.email}
                      </p>
                      <img
                        src={selectedTask.profileImage}
                        alt=""
                        style={{ maxWidth: "76px" }}
                      />
                    </>
                  ) : (
                    <Loader />
                  )}
                </Modal.Body>
              </Modal>
            </div>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <div>
              <p>10 Entries per page</p>
            </div>
            <div>
              Page {page} of {totalPages}
            </div>
            <div className="d-flex justify-content-between gap-4">
              <button className="btn-lg" onClick={handlePrev}>
                Prev
              </button>
              <button className="btn-lg" onClick={handleNext}>
                Next
              </button>
            </div>
          </div>
        </main>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default Employees;
