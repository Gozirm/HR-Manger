import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import arrow from "../../assets/teamArror.svg";
import addIcon from "../../assets/addIcon.svg";
import { useMatch } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Loader from "../../Auth/Loader";
import NewTaskModal from "../../Auth/ModalPage/NewTaskModal";
const Teams = () => {
  const [teamsActive, setTeamsActive] = useState(true);
  const match = useMatch("/admin-dashboard/employess/teams");
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDept, setSelectedDept] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("hr-token");
  const [modalTeamShow, setModalTeamShow] = React.useState(false);
  const getAllDepartments = async () => {
    try {
      setIsLoading(true);
      const req = await axios.get(
        "https://hr-manger.onrender.com/api/department/all-departments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(req.data.departments);
      setData(req.data.departments);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  // signle dept
  const getDeptById = async (id) => {
    try {
      const res = await axios.get(
        `https://hr-manger.onrender.com/api/department/departments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSelectedDept(res.data.department);
      setShowModal(true);
      console.log(res.data.department);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllDepartments();
  }, []);
  if (isLoading)
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <Loader />
      </div>
    );
  return (
    <>
      {match ? (
        <main className="mt-lg-5 container">
          {/*  */}
          <h1 className="mt-4">Employees</h1>
          <p className="title">Dashboard/Employee</p>
          <div className="d-flex align-items-center justify-content-between gap-4">
            <div className="d-flex align-items-center gap-md-5 gap-3">
              <Link to="/admin-dashboard/employess" className="text-secondary">
                All Employees
              </Link>
              <Link
                to="/admin-dashboard/employess/teams"
                className={teamsActive ? "active-link" : "text-secondary "}
                onClick={() => {
                  setEmployeesActive(false);
                  setTeamsActive(true);
                }}
              >
                Team
              </Link>
            </div>
            <button
              style={{
                width: "25%",
                color: "white",
                backgroundColor: "#3439CA",
                fontFamily: "Bricolage Grotesque, sans-serif",
              }}
              className="newEmployeebtn px-3"
              onClick={() => setModalTeamShow(true)}
            >
              <img src={addIcon} className="me-1" />
              New Team
            </button>
          </div>
          <hr />

          {data.length === 0 ? (
            <h1 className="d-flex align-items-center justify-content-center ">
              No Teams Created Yet
            </h1>
          ) : (
            <div className="gap-4  justify-content-between w-100 mx-0 row">
              {data.map((datum) => {
                return (
                  // <div className="row">
                  <div className="border p-3 rounded teams col-4  ">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h2>{datum.name}</h2>
                        <p>{datum.membersLenght} Members</p>
                      </div>
                      <Link
                        className="text-primary"
                        onClick={() => getDeptById(datum._id)}
                      >
                        View All
                      </Link>
                    </div>
                    <hr />
                    <div>
                      <div className="d-flex justify-content-between align-items-center ">
                        <div className="d-flex align-items-center gap-3">
                          <img
                            src={datum?.manager?.profileImage}
                            alt=""
                            className="profileImgIcon mt-3"
                          />
                          <div className="pt-3">
                            <h5 className="mb-0">{datum?.manager?.fullName}</h5>
                            <p className="m-0">Manager</p>
                          </div>
                        </div>
                        <img src={arrow} alt="" />
                      </div>
                      {datum?.members.slice(0, 3).map((datumMembers) => {
                        return (
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center gap-3">
                              <img
                                src={datumMembers?.profileImage}
                                alt=""
                                className="profileImgIcon mt-3"
                              />
                              <div className="pt-3">
                                <h5 className="mb-0">
                                  {datumMembers?.fullName}
                                </h5>
                                <p className="m-0">{datumMembers?.jobTitle}</p>
                              </div>
                            </div>
                            <img src={arrow} alt="" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  // </div>
                );
              })}
            </div>
          )}

          <NewTaskModal show={modalTeamShow} onHide={() => {setModalTeamShow(false)
            getAllDepartments()}
          } />
          {/* modal for single dept */}
          <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            centered
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title>
                <div className="d-flex justify-content-between gap-5">
                  <h6> {selectedDept?.name} Department </h6>{" "}
                  <button>Edit</button>
                </div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedDept?.members?.map((depts) => {
                return (
                  <div className="d-flex justify-content-between">
                    <div className="teams-wrapper-employees-profile-pic">
                      <img
                        src={depts.profileImage}
                        alt=""
                        className="profileImgIcon"
                      />
                    </div>
                    <h5> {depts?.fullName} </h5>
                    <div className="d-flex gap-5">
                      <span> {depts?.jobTitle} </span>
                      <span> {depts?.status} </span>
                    </div>
                  </div>
                );
              })}
            </Modal.Body>
            {/* <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer> */}
          </Modal>
        </main>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default Teams;
