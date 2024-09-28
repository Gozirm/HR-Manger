import React, { useState } from "react";
import { Employ } from "../tables";
import Table from "react-bootstrap/Table";
import { Outlet, Link, useMatch } from "react-router-dom";
import addIcon from "../assets/addIcon.svg";
const Employees = () => {
  const match = useMatch("/admin-dashboard/employess");
  const [employeesActive, setEmployeesActive] = useState(true);
  const [teamsActive, setTeamsActive] = useState(false);
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
              <Table responsive="lg">
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
                  {Employ.map((employe) => {
                    const { id, names, img, email, team, supervisor, status } =
                      employe;
                    return (
                      <tr key={id} className="title">
                        <td>
                          <div className="d-flex gap-2 align-items-center">
                            <img src={img} alt="" />
                            <p className="mt-3 ">{names}</p>
                          </div>
                        </td>
                        <td>
                          <p className="mt-3">{email}</p>
                        </td>
                        <td>
                          <p className="mt-3">{team}</p>
                        </td>
                        <td>
                          <p className="mt-3">{supervisor}</p>
                        </td>
                        <td className="text-center pt-3 ">
                          <p
                            className={`action-status mt-2 ${status
                              .replace(/\s+/, "-")
                              .toLowerCase()}`}
                          >
                            {status}
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

export default Employees;
