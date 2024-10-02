import React from "react";
import "../Styles/AdminSummary.css";
import inProgressIcon from "../assets/inProgessIcon.svg";
import completedIcon from "../assets/completedIcon.svg";
import plannedIcon from "../assets/plannedIcon.svg";
import allProjectIcon from "../assets/allProjectIcon.svg";
import Table from "react-bootstrap/Table";
import { table } from "../tables";
import { Link } from "react-router-dom";
import addIcon from "../assets/addIcon.svg";
import { useMatch } from "react-router-dom";
import { Outlet } from "react-router-dom";
const TaskBoard = () => {
  const match = useMatch("/admin-dashboard/taskboard");
  return (
    <>
      {match ? (
        <main className="mt-lg-5 container">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <h1 className="mt-4">Taskboard</h1>
              <p className="title">Dashboard/Taskboard</p>
            </div>
            <Link to="/admin-dashboard/taskboard/new-task">
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
                New Task
              </button>
            </Link>
          </div>
          <div className="mt-4 gap-4 d-lg-flex d-md-block  ">
            <div className="sections">
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="title-admin">In Progress</h6>
                <img src={inProgressIcon} alt="" />
              </div>
              <h2 className="num-admin">23</h2>
            </div>
            <div className="sections">
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="title-admin">Completed</h6>
                <img src={completedIcon} alt="" />
              </div>
              <h2 className="num-admin">20</h2>
            </div>
            <div className="sections">
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="title-admin">Planned</h6>
                <img src={plannedIcon} alt="" />
              </div>
              <h2 className="num-admin">15</h2>
            </div>
            <div className="sections">
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="title-admin">All Projects</h6>
                <img src={allProjectIcon} alt="" />
              </div>
              <h2 className="num-admin">20</h2>
            </div>
          </div>
          {/* Tables */}
          <div className="mt-5 border p-4  rounded-4">
            <h2>Tables</h2>
            <div>
              <Table responsive="lg">
                <thead className="text-white">
                  <tr className="title-tr">
                    <th className="bg-light hastag">#</th>
                    <th className="bg-light">Task</th>
                    <th className="bg-light">Team</th>
                    <th className="bg-light">Duration</th>
                    <th className="text-center bg-light action-1">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {table.map((titles) => {
                    const { id, title, icon, start, end, action } = titles;
                    return (
                      <tr key={id}>
                        <td>
                          <input type="checkbox" className="checkbox mt-3" />
                        </td>
                        <td className="title">
                          <p className="mt-3">{title}</p>
                        </td>
                        <td>
                          <div className="mt-3">
                            <img src={icon} alt="" />
                          </div>
                        </td>
                        <td>
                          <div className="mt-2">
                            <p className="m-0 start">{start}</p>
                            <p className="end">{end}</p>
                          </div>
                        </td>
                        <td className="text-center pt-3 ">
                          <p
                            className={`action-status mt-2 ${action
                              .replace(/\s+/, "-")
                              .toLowerCase()}`}
                          >
                            {action}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </main>
      ) : (
        <Outlet />
      )}
    </>
  );
};
export default TaskBoard;
