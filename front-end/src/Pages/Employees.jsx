import React from "react";
import { Employ } from "../tables";
import Table from "react-bootstrap/Table";
import { Outlet, Link, useMatch } from "react-router-dom";
import addIcon from "../assets/addIcon.svg";
const Employees = () => {
  const match = useMatch("/admin-dashboard/employess");
  return (
    <main className="container">
      <h1 className="mt-4">Employees</h1>
      <p className="title">Dashboard/Employee</p>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-md-5">
          <Link to="/admin-dashboard/employess">All Employees</Link>
          <Link to="/admin-dashboard/employess/teams" className="">
            Team
          </Link>
        </div>
        <Link to="/admin-dashboard/employess/add-employess">
          <button
            style={{
              width: "100%",
              color: "white",
              backgroundColor: "#3439CA",
              fontFamily: "Bricolage Grotesque, sans-serif",
            }}
          >
            <img src={addIcon} className="me-1" />
            New Employee
          </button>
        </Link>
      </div>
      <hr />
      {/* Tables */}
      {match ? (
        <div className="mt-5 border p-3 rounded-4">
          <div >
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
      ) : (
        <Outlet />
      )}
      <section>
        
      </section>
    </main>
  );
};

export default Employees;
