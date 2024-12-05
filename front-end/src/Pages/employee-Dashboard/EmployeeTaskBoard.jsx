import React, { useEffect } from "react";
import "../../Styles/AdminSummary.css";
import Table from "react-bootstrap/Table";
import { table } from "../../tables";
import { Link } from "react-router-dom";
import addIcon from "../../assets/addIcon.svg";
import { useMatch } from "react-router-dom";
import { useState } from "react";
import ModalSection from "../../Auth/ModalPage/ModalSection";
import AdminDashboard from "./AdminDashboard";
import axios from "axios";
import Loader from "../../Auth/Loader";
const EmployeeTaskBoard = () => {
  const match = useMatch("/employee-dashboard/taskboard");
  const [modalShow, setModalShow] = React.useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("hr-token");

  const fetchAssignedTasks = async () => {
    try {
      const response = await axios.get(
        "https://hr-manger.onrender.com/api/task/tasks/assigned",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.tasks);
      setTasks(response.data.tasks);
    } catch (err) {
      setError(
        err.response?.data?.errMsg || "An error occurred while fetching tasks."
      );
      console.error(err); // Log the error to the console
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAssignedTasks();
  });
  if (loading)
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        {" "}
        <Loader />
      </div>
    );
  if (error) return <p>{error}</p>;
  return (
    <>
      <main className="mt-lg-5 container">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <h1 className="mt-4 ">Taskboard</h1>
            <p className="title">Dashboard/Taskboard</p>
          </div>
         
        </div>
        <AdminDashboard />
        {/* Tables */}
        <div className="mt-5 border p-4  rounded-4">
          <h2 className="animate__swing">Tables</h2>
          <div>
            <Table responsive="lg" hover role="button">
              <thead className="text-white">
                <tr className="title-tr">
                  <th className="bg-light">Task</th>
                  <th className="bg-light">Team</th>
                  <th className="bg-light">Duration</th>
                  <th className="text-center bg-light action-1">Action</th>
                </tr>
              </thead>
              <tbody>
                {tasks?.map((task) => {
                  const { _Id, title, startDate, endDate, status } = task;
                  return (
                    <tr
                      key={_Id}
                      onClick={() => {
                        setSelectedTask(task);
                        setModalShow(true);
                      }}
                    >
                   
                      <td className="title">
                        <p className="mt-3 pointer">{title}</p>
                      </td>
                      <td>
                        <div className="mt-3">
                          {task?.assignedMembers.slice(0, 2).map((img) => {
                            return (
                              <div key={img?._id}>
                                <div className="d-flex gap-5">
                                  <img
                                    className="profileImgIcon"
                                    src={img?.profileImage}
                                    alt=""
                                  />
                                </div>
                              </div>
                            );
                          })}{" "}
                        </div>
                      </td>
                      <td>
                        <div className="mt-2">
                          <p className="m-0 start">{startDate.slice(0, 10)}</p>
                          <p className="end">{endDate.slice(0, 10)}</p>
                        </div>
                      </td>
                      <td className="text-center pt-3 ">
                        <p className={`action-status mt-2 ${status}`}>
                          {status}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
          <ModalSection
            show={modalShow}
            onHide={() => setModalShow(false)}
            task={selectedTask}
          />
        </div>
      </main>
    </>
  );
};

export default EmployeeTaskBoard;
