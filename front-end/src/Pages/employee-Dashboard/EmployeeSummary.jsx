import taskIcon from "../../assets/Task.svg";
import LeavesIcon from "../../assets/Leaves.svg";
import "../../Styles/AdminSummary.css";
import React, { useEffect, useState } from "react";
import { IoTrashSharp } from "react-icons/io5";
import { MdOutlineGridView } from "react-icons/md";
import employeesIcon from "../../assets/TotalEmployeesIcon.svg";
import "../../Styles/AdminSummary.css";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Loader from "../../Auth/Loader.jsx";
import toast from "react-hot-toast";
import AdminDashboard from "./AdminDashboard.jsx";
const EmployeeSummary = () => {
  const [data, setData] = useState({});
  const [isActivities, setIsActivities] = useState([]);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [active, setisActive] = useState("");
  const [page, setPage] = useState(1);
  const token = localStorage.getItem("hr-token");
  const getCounts = async () => {
    try {
      setisActive("--");
      const req = await axios.get(
        "https://hr-manger.onrender.com/api/totalLenght/totalUsers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(req.data);
      setData(req.data);
    } catch (error) {
    } finally {
      setisActive("");
    }
  };
  const getAllTasks = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:4040/api/leave/employee/activities`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.activities);
      setIsActivities(response.data.activities);
    } catch (error) {
      setError(error.response?.data.errMsg || "Error fetching employees");
    } finally {
      setIsLoading(false);
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
  const getTaskById = async (id) => {
    try {
      setIsLoading(true);
      const req = await axios.get(`http://localhost:4040/api/employee/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSelectedTask(req.data.task);
      setShowModal(true);
      console.log(req.data.task);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getCounts();
    getAllTasks();
  }, [page]);
  if (isLoading) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        {" "}
        <Loader />{" "}
      </div>
    );
  }
  return (
    <>
      <main className="mt-lg-5 container">
        <h1 className="mt-4">Dashboard</h1>
        <AdminDashboard />
        {/* Tables */}
        <div className="mt-5 border p-4  rounded-4">
          <h1>Recent Activities</h1>
          <div>
            {isActivities.length === 0 ? (
              <h1>No Task</h1>
            ) : (
              <Table responsive="lg">
                <thead className="text-white">
                  <tr className="title-tr">
                    {/* <th className="bg-light hastag">#</th> */}
                    <th className="bg-light">Task</th>
                    <th className="bg-light">Description</th>
                    <th className="bg-light">Date</th>
                    <th className="text-center bg-light">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {isActivities?.map((titles) => {
                    const { _id, type, description, startDate, status } =
                      titles;
                    return (
                      <tr key={_id}>
                        <td className="title">
                          <p className="mt-3">{type}</p>
                        </td>
                        <td>
                          <div className="mt-4 mt-lg-2 title">
                            <p>{description}</p>
                          </div>
                        </td>
                        <td className="pt-3 title">
                          <p>{startDate.slice(0, 10)}</p>
                        </td>
                        <td className="text-center pt-3 title">
                          <p className={status}>{status}</p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            )}
            <Modal
              show={showModal}
              onHide={() => setShowModal(false)}
              centered
              size="lg"
            >
              <Modal.Header closeButton>
                <Modal.Title>Task Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {selectedTask ? (
                  <>
                    <div className="d-lg-flex gap-5">
                      <div>
                        <p>
                          <span className="task-modal">Task Name: </span>
                          <span className="title"> {selectedTask.title}</span>
                        </p>

                        <p>
                          <span className="task-modal">Start Date:</span>{" "}
                          <span className="title">
                            {" "}
                            {selectedTask.startDate.slice(0, 10)}{" "}
                          </span>
                        </p>
                        <p>
                          <span className="task-modal">Team: </span>
                          <span className="title">
                            {selectedTask.assignedMembers
                              .map(
                                (member) =>
                                  `${member.firstName} ${member.lastName}`
                              )
                              .join(", ")}
                          </span>
                        </p>
                      </div>
                      <div>
                        <p>
                          <span className="task-modal">Status: </span>
                          <span className={selectedTask?.status}>
                            {" "}
                            {selectedTask?.status}{" "}
                          </span>
                        </p>
                        <p>
                          <span className="task-modal">End Date: </span>
                          <span className="title">
                            {selectedTask.endDate.slice(0, 10)}
                          </span>
                        </p>
                        {selectedTask.assignedMembers.map((img) => {
                          return (
                            <img
                              src={img?.profileImage}
                              className="profileImgIcon"
                              alt=""
                            />
                          );
                        })}
                      </div>
                    </div>
                    <hr />
                  </>
                ) : (
                  <Loader />
                )}
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </main>
    </>
  );
};
export default EmployeeSummary;
