import React, { useEffect, useState } from "react";
import { IoTrashSharp } from "react-icons/io5";
import { MdOutlineGridView } from "react-icons/md";
import employeesIcon from "../../assets/TotalEmployeesIcon.svg";
import taskIcon from "../../assets/Task.svg";
import LeavesIcon from "../../assets/Leaves.svg";
import "../../Styles/AdminSummary.css";
import Table from "react-bootstrap/Table";
import { table } from "../../tables";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Loader from "../../Auth/Loader.jsx";
import toast from "react-hot-toast"
const AdminSummary = () => {
  const [data, setData] = useState({});
  const [task, setTasks] = useState([]);
  const [taskImg, setTasksImg] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("hr-token");
  const getCounts = async () => {
    try {
      const req = await axios.get(
        "http://localhost:4000/api/totalLenght/totalUsers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(req.data);
      setData(req.data);
    } catch (error) {}
  };
  const getAllTasks = async () => {
    try {
      const req = await axios.get("http://localhost:4000/api/task", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(req.data.tasks);
      setTasks(req.data.tasks);
    } catch (error) {}
  };
  const getTaskById = async (id) => {
    try {
      setIsLoading(true);
      const req = await axios.get(`http://localhost:4000/api/task/${id}`, {
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
  const deleteTask = async (id) => {
    try {
      console.log("clicked");
      setIsLoading(true);
      const req = await axios.delete(`http://localhost:4000/api/task/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getCounts();

      console.log(req);
      if(req.data.success){
        toast.success(req.data.message)
      }
      setTasks(task.filter((existingDatum) => existingDatum._id !== id));
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getCounts();
    getAllTasks();
  }, []);
  if (isLoading) {
    return (
      <div className="vh-100 d-flex justify-content-center">
        {" "}
        <Loader />{" "}
      </div>
    );
  }

  return (
    <>
      <main className="mt-lg-5 container">
        <h1 className="mt-4">Dashboard</h1>
        <div className="mt-4 gap-4 d-lg-flex d-md-block  ">
          <div className="d-flex justify-content-between align-items-center sections">
            <div>
              <h6 className="title-admin">Total Employees </h6>
              <h2 className="num-admin">{data?.detialsForUser}</h2>
            </div>
            <img src={employeesIcon} alt="" />
          </div>
          <div className="d-flex justify-content-between align-items-center sections">
            <div>
              <h6 className="title-admin">Total Tasks</h6>
              <h2 className="num-admin">{data?.detialsForTask}</h2>
            </div>
            <img src={taskIcon} alt="" />
          </div>
          <div className="d-flex justify-content-between align-items-center sections">
            <div>
              <h6 className="title-admin">Current Leaves </h6>
              <h2 className="num-admin">{data?.detailsForLeave}</h2>
            </div>
            <img src={LeavesIcon} alt="" />
          </div>
        </div>
        {/* Tables */}
        <div className="mt-5 border p-4  rounded-4">
          <h2>Tables</h2>
          <div>
            <Table responsive="lg">
              <thead className="text-white">
                <tr className="title-tr">
                  {/* <th className="bg-light hastag">#</th> */}
                  <th className="bg-light">Task</th>
                  <th className="bg-light">Team</th>
                  <th className="bg-light">Duration</th>
                  <th className="text-center bg-light">Action</th>
                  <th className="text-center bg-light action-1"></th>
                </tr>
              </thead>
              <tbody>
                {task?.map((titles) => {
                  const { _id, title, startDate, endDate, status } = titles;
                  return (
                    <tr key={_id}>
                      {/* <td>
                        <input type="checkbox" className="checkbox mt-3" />
                      </td> */}
                      <td className="title">
                        <p className="mt-3">{title}</p>
                      </td>
                      <td>
                        {titles?.assignedMembers?.map((img) => {
                          return (
                            <img
                              src={img.profileImage}
                              alt=""
                              className="profileImgIcon mt-3"
                            />
                          );
                        })}
                      </td>
                      <td>
                        <div className="mt-2">
                          <p className="m-0 start">{startDate.slice(0, 10)}</p>
                          <p className="end">{endDate.slice(0, 10)}</p>
                        </div>
                      </td>
                      <td className="text-center pt-3 ">
                        <p className={status}>{status}</p>
                      </td>
                      <td>
                        <div className="d-flex gap-3 justify-content-center mt-2">
                          <p
                            className="text-success fs-4"
                            role="button"
                            onClick={() => getTaskById(titles._id)}
                          >
                            <MdOutlineGridView />
                          </p>
                          <p
                            className="text-danger fs-4"
                            role="button"
                            onClick={() => deleteTask(titles._id)}
                          >
                            <IoTrashSharp />
                          </p>
                        </div>
                        
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
              <Modal.Header closeButton>
                <Modal.Title>Task Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {selectedTask ? (
                  <>
                    <p>
                      <strong>Title:</strong> {selectedTask.title}
                    </p>
                    <p>
                      <strong>Status:</strong> {selectedTask.status}
                    </p>
                    <p>
                      Assigned Members:{" "}
                      {selectedTask.assignedMembers
                        .map(
                          (member) => `${member.firstName} ${member.lastName}`
                        )
                        .join(", ")}
                    </p>
                    <p>Start Date {selectedTask.startDate.slice(0, 10)}</p>
                    <p>
                      <strong>End Date:</strong>{" "}
                      {selectedTask.endDate.slice(0, 10)}
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

export default AdminSummary;
