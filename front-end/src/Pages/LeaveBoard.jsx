import React from "react";
import "../Styles/AdminSummary.css";
import Table from "react-bootstrap/Table";
import { leave, table } from "../tables";
import { Link, Outlet } from "react-router-dom";
import dottedImg from "../assets/dotted.svg";
import leavelady from "../assets/leavelady.svg";
import { useMatch } from "react-router-dom";
const LeaveBoard = () => {
  const match = useMatch("/admin-dashboard/leaveboard")
  return (
    <>
    {match ? (
      <main className="mt-lg-5 container">
      <h1 className="mt-4">Leaveboard</h1>
      <p className="title">Dashboard/Leaveboard</p>
      <div className="mt-4 gap-4 d-lg-flex d-md-block  ">
        <div className="sections">
          <div className="text-center">
            <h6 className="title-admin">HR/Admin</h6>
            <h2 className="num-admin-num">3</h2>
          </div>
        </div>
        <div className="sections">
          <div className="text-center">
            <h6 className="title-admin">Product</h6>
            <h2 className="num-admin-num">5</h2>
          </div>
        </div>
        <div className="sections">
          <div className="text-center">
            <h6 className="title-admin">Marketing</h6>
            <h2 className="num-admin-num">4</h2>
          </div>
        </div>
        <div className="sections">
          <div className="text-center">
            <h6 className="title-admin">Operations</h6>
            <h2 className="num-admin-num">6</h2>
          </div>
        </div>
      </div>
      {/* Tables */}
      <div className="mt-5 border p-4  rounded-4">
        <h2>Tables</h2>
        <div>
          <Table responsive="lg">
            <thead className="text-white">
              <tr className="title-tr">
                <th className="bg-light">Name</th>
                <th className="bg-light">Leave Type</th>
                <th className="bg-light">Duration</th>
                <th className="text-center bg-light action-1">Days</th>
                <th className="text-center bg-light action-1">Status</th>
                <th className="text-center bg-light action-1"></th>
              </tr>
            </thead>
            <tbody>
              {leave.map((titles) => {
                const { id, title, icon, start, end, action, days, leave } =
                  titles;
                return (
                  <tr key={id}>
                    <td className="title">
                      <Link to={`/admin-dashboard/leaveboard/leave-request/${id}`}>
                        <div className="d-flex gap-2">
                          <img src={leavelady} alt="" />
                          <p className="mt-3">Oluwatosin Sanya</p>
                        </div>
                      </Link>
                    </td>
                    <td className="title">
                      <p className="mt-3">{leave}</p>
                    </td>
                    <td>
                      <div className="mt-3">
                        <p className="m-0 start">{start}</p>
                        <p className="end">{end}</p>
                      </div>
                    </td>
                    <td className="text-center pt-3 title">
                      <p className="mt-3">{days}</p>
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
                    <td className="text-center pt-3 ">
                      <p className="mt-2">
                        <img src={dottedImg} alt="" />
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

    ) : (<Outlet/>)}

    </>
  );
};

export default LeaveBoard;
