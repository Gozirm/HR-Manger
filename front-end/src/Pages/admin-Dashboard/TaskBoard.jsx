import React from "react";
import "../../Styles/AdminSummary.css";
import inProgressIcon from "../../assets/inProgessIcon.svg";
import completedIcon from "../../assets/completedIcon.svg";
import plannedIcon from "../../assets/plannedIcon.svg";
import allProjectIcon from "../../assets/allProjectIcon.svg";
import Table from "react-bootstrap/Table";
import addIcon from "../../assets/addIcon.svg";
import { useMatch } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../../Auth/Loader";
import ModalSection from "../../Auth/ModalPage/ModalSection";
import axios from "axios";
import TaskModal from "../../Auth/ModalPage/TaskModal";
import Button from "react-bootstrap/Button";
const TaskBoard = () => {
  const match = useMatch("/admin-dashboard/taskboard");
  const [modalShow, setModalShow] = React.useState(false);
  const [taskModalshow, setTaskModalshow] = React.useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [task, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [getstatusCounts, setStatusCounts] = useState({
    "in-progress": 0,
  });
  const [getCounts, setGetCounts] = useState();

  const token = localStorage.getItem("hr-token");

  const getAllTasks = async () => {
    try {
      const req = await axios.get("http://localhost:4000/api/task/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(req.data.tasks);
      setTasks(req.data.tasks);
    } catch (error) {}
  };

  const getStatusCounts = async () => {
    try {
      const req = await axios.get(
        "http://localhost:4000/api/task//tasks/status-counts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(req);
      setStatusCounts(req.data.statusCounts);
      setGetCounts(req.data.statusCounts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTasks();
    getStatusCounts();
  }, []);
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
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <h1 className="mt-4 ">Taskboard</h1>
            <p className="title">Dashboard/Taskboard</p>
          </div>
          <Button
            variant="primary"
            style={{
              width: "25%",
              backgroundColor: "#3439CA",
              fontFamily: "Bricolage Grotesque, sans-serif",
            }}
            className="newEmployeebtn"
            onClick={() => setTaskModalshow(true)}
          >
            <img src={addIcon} className="me-1" />
            New Task
          </Button>
        </div>
        <div className="mt-4 gap-4 d-lg-flex d-md-block  ">
          <div className="sections">
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="title-admin">In Progress</h6>
              <img src={inProgressIcon} alt="" />
            </div>
            <h2 className="num-admin">{getstatusCounts["in-progress"]}</h2>
          </div>
          <div className="sections">
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="title-admin">Completed</h6>
              <img src={completedIcon} alt="" />
            </div>
            <h2 className="num-admin">{getCounts?.completed}</h2>
          </div>
          <div className="sections">
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="title-admin">Planned</h6>
              <img src={plannedIcon} alt="" />
            </div>
            <h2 className="num-admin">{getCounts?.planned}</h2>
          </div>
          <div className="sections">
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="title-admin">All Projects</h6>
              <img src={allProjectIcon} alt="" />
            </div>
            <h2 className="num-admin">{getCounts?.total}</h2>
          </div>
        </div>
        {/* Tables */}
        <div className="mt-5 border p-4  rounded-4">
          <h2 className="animate__swing">Tables</h2>
          {task.length === 0 ? (
            <div>
              <h1>No Task Yet</h1>
            </div>
          ) : (
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
                  {task?.map((titles) => {
                    const { _id, title, icon, startDate, endDate, status } =
                      titles;
                    return (
                      <tr
                        key={_id}
                        onClick={() => {
                          setSelectedTask(titles);
                          setModalShow(true);
                        }}
                      >
                        <td className="title">
                          <p className="mt-3 pointer">{title}</p>
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
                            <p className="m-0 start">
                              {startDate.slice(0, 10)}
                            </p>
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
          )}
          <ModalSection
            show={modalShow}
            onHide={() => setModalShow(false)}
            task={selectedTask}
          />
          <TaskModal
            show={taskModalshow}
            onHide={() => {
              setTaskModalshow(false);
              getAllTasks();
              getStatusCounts();
            }}
          />
        </div>
      </main>
    </>
  );
};
export default TaskBoard;
