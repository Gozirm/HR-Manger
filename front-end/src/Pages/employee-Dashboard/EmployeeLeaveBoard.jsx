import React, { useEffect } from "react";
import "../../Styles/AdminSummary.css";
import Table from "react-bootstrap/Table";
import { leave, table } from "../../tables";
import { Link, Outlet } from "react-router-dom";
import dottedImg from "../../assets/dotted.svg";
import leavelady from "../../assets/leavelady.svg";
import LeaveModal from "../../Auth/ModalPage/LeaveModal";
import { useMatch } from "react-router-dom";
import { useState } from "react";
import LeaveModalRequest from "../../components/LeaveModalRequest";
import axios from "axios";
import Loader from "../../Auth/Loader";
const EmployeeLeaveBoard = () => {
  const match = useMatch("/employee-dashboard/leaveboard");
  const [modalShow, setModalShow] = React.useState(false);
  const [selectedNewTask, setSelectedNewTask] = useState(null);
  const [modalShowRequest, setModalShowRequest] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [leave, setLeave] = useState({});
  const token = localStorage.getItem("hr-token");
  const fetchEmployeesLeaves = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const req = await axios.get(
        "http://localhost:4000/api/leave/employee/leaves",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(req.data);
      setData(req.data);
    } catch (error) {
      setError("Error fetching leaves");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const leaveType = async () => {
    setIsLoading(true);
    try {
      const req = await axios.get(
        "http://localhost:4000/api/leave/leave/Type",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(req.data);
      setLeave(req.data);
    } catch (error) {
      setError("Error fetching leaves");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchEmployeesLeaves();
    leaveType();
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
      {match ? (
        <main className="mt-lg-5 container">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <h1 className="mt-4">Leaveboard</h1>
              <p className="title">Dashboard/Leaveboard</p>
            </div>
            <button
              className="btn btn-lg btn-primary newEmployeebtn"
              style={{
                width: "25%",
                color: "white",
                backgroundColor: "#3439CA",
                fontFamily: "Bricolage Grotesque, sans-serif",
              }}
              onClick={() => setModalShowRequest(true)}
            >
              Leave Request
            </button>
          </div>
          <div className="mt-4 gap-4 d-lg-flex d-md-block  ">
            <div className="sections">
              <div className="text-center">
                <h6 className="title-admin">Annual Leave Remain</h6>
                <h2 className="num-admin-num">
                  {leave?.allLeaveType?.["Annual Leave"]}/20
                </h2>
              </div>
            </div>
            <div className="sections">
              <div className="text-center">
                <h6 className="title-admin">Sick Leave Remain</h6>
                <h2 className="num-admin-num">
                  {leave?.allLeaveType?.["Sick Leave"]}/10
                </h2>
              </div>
            </div>
            <div className="sections">
              <div className="text-center">
                <h6 className="title-admin">Casual Leave Remain</h6>
                <h2 className="num-admin-num">
                  {leave?.allLeaveType?.["Casual Leave"]}/10
                </h2>
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
                    {/* <th className="bg-light">Name</th> */}
                    <th className="bg-light">Leave Type</th>
                    <th className="bg-light">Duration</th>
                    <th className="text-center bg-light action-1">Days</th>
                    <th className="text-center bg-light action-1">Status</th>
                    <th className="text-center bg-light action-1"></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((titled) => {
                    const { _id, startDate, endDate, status, Days, leaveType } =
                      titled;
                    return (
                      <tr key={_id}>
                        {/* <td className="title">
                          <div
                            className="d-flex gap-2 pointer"
                            onClick={() => {
                              setSelectedNewTask(titled);
                              setModalShow(true);
                            }}
                          >
                            <img src={leavelady} alt="" />
                            <p className="mt-3">Oluwatosin Sanya</p>
                          </div>
                        </td> */}
                        <td className="title">
                          <p className="mt-3">{leaveType}</p>
                        </td>
                        <td>
                          <div className="mt-3">
                            <p className="m-0 start">
                              {startDate.slice(0, 10)}
                            </p>
                            <p className="end">{endDate.slice(0, 10)}</p>
                          </div>
                        </td>
                        <td className="text-center pt-3 title">
                          <p className="mt-3">{Days} Days</p>
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
            <LeaveModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              newtask={selectedNewTask}
            />
            <LeaveModalRequest
              show={modalShowRequest}
              onHide={() => {
                setModalShowRequest(false);
                fetchEmployeesLeaves();
                leaveType();
              }}
            />
          </div>
        </main>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default EmployeeLeaveBoard;
