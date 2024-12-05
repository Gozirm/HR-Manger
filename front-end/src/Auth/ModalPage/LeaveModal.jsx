import React from "react";
import Modal from "react-bootstrap/Modal";
import leavelady from "../../assets/leavelady.svg";
import "../../Styles/AdminDashboard.css";
import toast from "react-hot-toast";
const LeaveModal = (param) => {
  const newtask = param.newtask;
  const handleApprove = async (leaveId) => {
    if (!leaveId) {
      console.error("Invalid id: leaveId is undefined or null");
      return;
    }
    console.log(leaveId);

    const token = localStorage.getItem("hr-token");
    try {
      const req = await fetch(
        `http://localhost:4000/api/leave/approve/${leaveId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );
      const res = await req.json();
      console.log(res); // Log the response data
      if (res) {
        param.onHide();
        toast.success(res.message);
        setShowModal(false);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Error approving leave request:", error);
    }
  };
  const handleDecline = async (leaveId) => {
    if (!leaveId) {
      console.error("Invalid id: leaveId is undefined or null");
      return;
    }
    console.log(leaveId);

    const token = localStorage.getItem("hr-token");
    try {
      const req = await fetch(
        `http://localhost:4000/api/leave/${leaveId}/decline`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );
      const res = await req.json();
      console.log(res); // Log the response data
      if (res) {
        param.onHide();
        toast.success(res.message);
        setShowModal(false);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Error approving leave request:", error);
    }
  };
  return (
    <>
      <Modal
        {...param}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Leave Request
          </Modal.Title>
        </Modal.Header>
        {newtask && (
          <Modal.Body>
            <div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2 w-100">
                  <img
                    src={newtask?.employee?.profileImage}
                    alt=""
                    className="profileImage mb-3"
                  />
                  <div>
                    <h2 className="m-0 profile-name">
                      {" "}
                      {newtask?.employee.fullName}
                    </h2>
                    <p className="text-secondary profile-email">
                      {newtask?.employee.email}{" "}
                    </p>
                  </div>
                </div>
                <button className="view-profile-btn">View Profile</button>
              </div>
              <div className="mt-3">
                <p className="title fs-5">Leave Details</p>
                <div className="d-lg-flex gap-5 align-items-center">
                  <div>
                    <div className="d-flex align-items-center gap-2">
                      <p>Leave Type:</p>
                      <p className="title">{newtask?.leaveType}</p>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <p>Start Date: </p>
                      <p className="title">{newtask?.startDate.slice(0, 10)}</p>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <p>Description:</p>
                      <p className="title">{newtask?.description}</p>
                    </div>
                  </div>
                  <div>
                    <div className="d-flex align-items-center gap-2">
                      <p>Duration:</p>
                      <p className="title">{newtask?.duration}</p>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <p>End Date:</p>
                      <p className="title">{newtask?.endDate.slice(0, 10)}</p>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <p>Status:</p>
                      <p className={`title ${newtask?.status} text-center mb-3`}>{newtask?.status}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <hr className="m-0 mb-3" />
                  <div className="d-flex align-items-center gap-2">
                    <p>Approved By:</p>
                    <p className="title">{newtask?.approvedBy}</p>
                  </div>
                  <hr className="m-0 mt-1" />
                </div>
              </div>
              <div className="d-lg-flex gap-3 mt-3">
                <button
                  className="save mt-3 mt-lg-0"
                  onClick={() => handleApprove(newtask?.leaveId)}
                >
                  Approve
                </button>

                <button
                  className="can border border-danger bg-danger text-light"
                  onClick={() => handleDecline(newtask?.leaveId)}
                >
                  Decline
                </button>
              </div>
            </div>
          </Modal.Body>
        )}
      </Modal>
    </>
  );
};

export default LeaveModal;
