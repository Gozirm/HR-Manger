import React from "react";
import Modal from "react-bootstrap/Modal";
import leavelady from "../../assets/leavelady.svg";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../../Styles/AdminDashboard.css";
function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const LeaveModal = (param) => {
  const newtask = param.newtask;
  const [modalShow, setModalShow] = React.useState(false);

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
                  <img src={leavelady} alt="" className="profile-img" />
                  <div>
                    <h2 className="m-0 profile-name">Oluwatosin Sanya</h2>
                    <p className="text-secondary profile-email">
                      temixalade23@gmail..com
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
                      <p className="title">{newtask.leave}</p>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <p>Start Date:</p>
                      <p className="title">{newtask.start}</p>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <p>Description:</p>
                      <p className="title">Nill</p>
                    </div>
                  </div>
                  <div>
                    <div className="d-flex align-items-center gap-2">
                      <p>Duration:</p>
                      <p className="title">{newtask.days}</p>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <p>End Date:</p>
                      <p className="title">{newtask.end}</p>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <p>Status:</p>
                      <p className="title">{newtask.action}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <hr className="m-0 mb-3" />
                  <div className="d-flex align-items-center gap-5">
                    <p>Leave Balance: </p>
                    <p className="title">(8) SickLeave, (6) Annual Leave</p>
                  </div>
                  <hr className="m-0 mt-1" />
                </div>
              </div>
              <div className="d-lg-flex gap-3 mt-3">
                <button
                  className="save mt-3 mt-lg-0"
                  onClick={() => setModalShow(true)}
                >
                  Approve
                </button>

                <button className="can" onClick={() => setModalShow(true)}>
                  Decline
                </button>
              </div>
            </div>
          </Modal.Body>
        )}
      </Modal>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default LeaveModal;
