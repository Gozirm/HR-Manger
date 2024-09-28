import React from "react";
import employeesIcon from "../assets/TotalEmployeesIcon.svg";
import taskIcon from "../assets/Task.svg";
import LeavesIcon from "../assets/Leaves.svg";
import "../Styles/AdminSummary.css";
import Table from "react-bootstrap/Table";
import { table } from "../tables";
const AdminSummary = () => {
  return (
    <>
      <main className="mt-lg-5 container">
        <h1 className="mt-4">Dashboard</h1>
        <div className="mt-4 gap-4 d-lg-flex d-md-block  ">
          <div className="d-flex justify-content-between align-items-center sections">
            <div>
              <h6 className="title-admin">Total Employees </h6>
              <h2 className="num-admin">24</h2>
            </div>
            <img src={employeesIcon} alt="" />
          </div>
          <div className="d-flex justify-content-between align-items-center sections">
            <div>
              <h6 className="title-admin">Total Tasks</h6>
              <h2 className="num-admin">107</h2>
            </div>
            <img src={taskIcon} alt="" />
          </div>
          <div className="d-flex justify-content-between align-items-center sections">
            <div>
              <h6 className="title-admin">Current Leaves </h6>
              <h2 className="num-admin">15</h2>
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
    </>
  );
};

export default AdminSummary;
