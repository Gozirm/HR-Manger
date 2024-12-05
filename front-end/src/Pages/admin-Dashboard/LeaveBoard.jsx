import React from "react";
import "../../Styles/AdminSummary.css";
import Table from "react-bootstrap/Table";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import LeaveModal from "../../Auth/ModalPage/LeaveModal";
import { useMatch } from "react-router-dom";
import Loader from "../../Auth/Loader";
import { getAllLeaves } from "../../components/getAllLeaves";
import LeaveModalRequest from "../../components/LeaveModalRequest";
const LeaveBoard = () => {
  const match = useMatch("/admin-dashboard/leaveboard");
  const [showModal, setShowModal] = React.useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [modalShowRequest, setModalShowRequest] = useState(false);
  const [counts, setCounts] = useState({});
  const [Adminrole, setAdminrole] = useState();
  const token = localStorage.getItem("hr-token");
  const totalCounts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/department/counts-departments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.departments);
      setCounts(response.data.departments);
    } catch (error) {}
  };
  const role = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/department/roles");
      console.log(res.data.count);
      setAdminrole(res.data.count);
    } catch (error) {}
  };
  const fetchLeaves = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const leaves = await getAllLeaves(token);
      setData((prevData) => {
        // Prepend new leaves to the existing data
        return [...leaves, ...prevData];
      });
    } catch (error) {
      setError("Error fetching leaves");
    } finally {
      setIsLoading(false);
    }
  };
  const handleModalShow = async (leaveId) => {
    console.log("id passed to handleModalShow:", leaveId); // Log the id
    if (!leaveId) {
      console.error("Invalid id: leaveid is undefined or null");
      return; // Exit if leaveid is not valid
    }
    try {
      setIsLoading(true);
      console.log(22);
      const req = await axios.get(
        `http://localhost:4000/api/leave/${leaveId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(req.data);
      setSelectedLeave(req.data);
      setShowModal(true);
    } catch (error) {
      setError("Error fetching leave details");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchLeaves();
    totalCounts();
    role();
  }, []);
  if (isLoading) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        {" "}
        <Loader />{" "}
      </div>
    );
  }
  const handleRowClick = (leaveId) => {
    handleModalShow(leaveId);
  };
  if (error) {
    return <div className="error-message">{error}</div>;
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
              className="btn btn-md btn-primary w-25"
              onClick={() => setModalShowRequest(true)}
            >
              Request Leave
            </button>
          </div>
          <div className="mt-4 gap-4 d-lg-flex d-md-block  ">
            <div className="sections">
              <div className="text-center">
                <h6 className="title-admin">HR/Admin</h6>
                <h2 className="num-admin-num">{Adminrole}</h2>
              </div>
            </div>
            <div className="sections">
              <div className="text-center">
                <h6 className="title-admin">Product</h6>
                <h2 className="num-admin-num">
                  {counts?.Selling?.membersLength + 1}
                </h2>
              </div>
            </div>
            <div className="sections">
              <div className="text-center">
                <h6 className="title-admin">Marketing</h6>
                <h2 className="num-admin-num">
                  {" "}
                  {counts.Marketing?.membersLength + 1}
                </h2>
              </div>
            </div>
            <div className="sections">
              <div className="text-center">
                <h6 className="title-admin">Operations</h6>
                <h2 className="num-admin-num">
                  {counts?.Operations?.membersLength + 1}
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
                    <th className="bg-light">Name</th>
                    <th className="bg-light">Leave Type</th>
                    <th className="bg-light">Duration</th>
                    <th className="text-center bg-light action-1">Days</th>
                    <th className="text-center bg-light action-1">Status</th>
                    <th className="text-center bg-light action-1"></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((leave) => {
                    const {
                      Days,
                      endDate,
                      leaveType,
                      profileImage,
                      startDate,
                      status,
                      fullName,
                      id,
                    } = leave;
                    return (
                      <tr
                        key={id}
                        onClick={() => handleRowClick(leave?.id)}
                        role="button"
                      >
                        <td className="title">
                          <div className="d-flex gap-2">
                            <img
                              src={profileImage}
                              alt=""
                              className="profileImage mt-lg-2 mt-3"
                            />
                            <p className="mt-3">{fullName}</p>
                          </div>
                        </td>
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
                          <p className="mt-3">{Days}</p>
                        </td>
                        <td className="text-center pt-3 ">
                          <p className={`action-status mt-2  ${status}`}>
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
              show={showModal}
              onHide={() => {
                setShowModal(false);
                fetchLeaves();
              }}
              newtask={selectedLeave}
            />
          </div>
          <LeaveModalRequest
            show={modalShowRequest}
            onHide={() => {
              setModalShowRequest(false);
              fetchLeaves();
            }}
          />
        </main>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default LeaveBoard;
