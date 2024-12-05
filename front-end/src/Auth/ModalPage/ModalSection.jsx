import React from "react";
import Modal from "react-bootstrap/Modal";
import "../../Styles/AdminDashboard.css";
import "../../Styles/AdminSummary.css";
const ModalSection = (props) => {
  const task = props.task;
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
              Task Details
          </Modal.Title>
        </Modal.Header>
        {task && (
          <Modal.Body>
            <div className="d-lg-flex justify-content-between align-items-center ">
              <div className="d-flex row align-items-center ps-0  m-0 settings-width">
                <div className="d-flex p-0 gap-2 align-items-center">
                  <p className="text-secondary">Task Name:</p>
                  <p className="title">{task.title}</p>
                </div>
                <div className="d-flex p-0 gap-2">
                  <p className="text-secondary">Start Date:</p>
                  <p className="title">{task.startDate.slice(0, 10)}</p>
                </div>

                <div className="d-flex p-0   gap-2">
                  <p className="text-secondary">Description:</p>
                  <p className="title">{task?.description}</p>
                </div>
              </div>
              <div className="settings-width">
                <div className="d-flex gap-2 align-items-center">
                  <p className="text-secondary mt-sm-3">Team:</p>
                  {task.assignedMembers.map((img) => {
                    return (
                      <img
                        key={img.id}
                        src={img?.profileImage}
                        alt="profile Image"
                        className="mb-lg-3 profileImgIcon mt-md-3 mb-3"
                      />
                    );
                  })}
                </div>
                <div className="d-flex gap-2">
                  <p className="text-secondary">End Date:</p>
                  <p className="title">{task.endDate.slice(0, 10)}</p>
                </div>
                <div className="d-flex gap-2">
                  <p className="text-secondary">Status:</p>
                  <p className={`${task.status} m-0 text-center`}>
                    {task.status}
                  </p>
                </div>
              </div>
            </div>
          </Modal.Body>
        )}
      </Modal>
    </>
  );
};

export default ModalSection;
