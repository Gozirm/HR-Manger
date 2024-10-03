import React from "react";
import { teams } from "../../db";
import { Link, Outlet } from "react-router-dom";
import arrow from "../../assets/teamArror.svg";
import { useState } from "react";
import addIcon from "../../assets/addIcon.svg";
import { useMatch } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import xIcon from "../../assets/xIcon.svg";
import { Employ } from "../../tables";
import Table from "react-bootstrap/Table";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="p-3">
        <div className="d-flex justify-content-between mb-3">
          <h1>Product Team</h1>
          <div className="d-flex gap-lg-4 gap-3 align-items-center">
            <Link to="/admin-dashboard/employess/teams/edit-teams">
              <button className="editTeam">Edit Team</button>
            </Link>
            <img onClick={props.onHide} src={xIcon} />
          </div>
        </div>
        <div>
          <Table responsive="lg">
            <thead className="text-white">
              <tr className="title-tr">
                <th className="bg-light ">Team Members</th>
                <th className="bg-light">Role</th>
                <th className="text-center bg-light ">Status</th>
              </tr>
            </thead>
            <tbody>
              {Employ.map((employe) => {
                const {
                  id,
                  names,
                  img,
                  email,
                  team,
                  supervisor,
                  status,
                  role,
                } = employe;
                return (
                  <tr key={id} className="title">
                    <td>
                      <div className="d-flex gap-2 align-items-center">
                        <img src={img} alt="" />
                        <p className="mt-3 ">{names}</p>
                      </div>
                    </td>
                    <td>
                      <p className="mt-3">{role}</p>
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
      </Modal.Body>
    </Modal>
  );
}
const Teams = () => {
  const [teamsActive, setTeamsActive] = useState(true);
  const match = useMatch("/admin-dashboard/employess/teams");
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow1, setModalShow1] = React.useState(false);
  const [modalShow2, setModalShow2] = React.useState(false);
  const [modalShow3, setModalShow3] = React.useState(false);
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
            <Link to="/admin-dashboard/employess/teams/new-teams">
              <button
                style={{
                  width: "100%",
                  color: "white",
                  backgroundColor: "#3439CA",
                  fontFamily: "Bricolage Grotesque, sans-serif",
                }}
                className="newEmployeebtn px-3"
              >
                <img src={addIcon} className="me-1" />
                New Team
              </button>
            </Link>
          </div>
          <hr />
          <div className="d-lg-flex row">
            <div className="d-lg-flex gap-5 w-100">
              <div className="border p-3 rounded  teams">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h2>Product Team </h2>
                    <p>20 Members</p>
                  </div>
                  <Link
                    className="text-primary"
                    onClick={() => setModalShow(true)}
                  >
                    View All
                  </Link>
                  <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />
                </div>
                <hr />
                {teams.map((teams) => {
                  const { id, name, position, Image } = teams;
                  return (
                    <div
                      key={id}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <div className="d-flex align-items-center gap-3">
                        <img src={Image} alt="" />
                        <div className="pt-3">
                          <h5 className="m-0">{name}</h5>
                          <p>{position}</p>
                        </div>
                      </div>
                      <img src={arrow} alt="" />
                    </div>
                  );
                })}
              </div>
              <div className="border p-3 rounded col-4 teams">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h2>Marketing Team </h2>
                    <p>20 Members</p>
                  </div>
                  <Link
                    className="text-primary"
                    onClick={() => setModalShow1(true)}
                  >
                    View All
                  </Link>
                  <MyVerticallyCenteredModal
                    show={modalShow1}
                    onHide={() => setModalShow1(false)}
                  />
                </div>
                <hr />
                {teams.map((teams) => {
                  const { id, name, position, Image } = teams;
                  return (
                    <div
                      key={id}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <div className="d-flex align-items-center gap-3">
                        <img src={Image} alt="" />
                        <div className="pt-3">
                          <h5 className="m-0">{name}</h5>
                          <p>{position}</p>
                        </div>
                      </div>
                      <img src={arrow} alt="" />
                    </div>
                  );
                })}
              </div>
            </div>
            {/* ============== */}
            <div className="d-lg-flex w-100 gap-5">
              <div className="border p-3 rounded   teams">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h2>Administration Team </h2>
                    <p>20 Members</p>
                  </div>
                  <Link
                    className="text-primary"
                    onClick={() => setModalShow2(true)}
                  >
                    View All
                  </Link>
                  <MyVerticallyCenteredModal
                    show={modalShow2}
                    onHide={() => setModalShow2(false)}
                  />
                </div>
                <hr />
                {teams.map((teams) => {
                  const { id, name, position, Image } = teams;
                  return (
                    <div
                      key={id}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <div className="d-flex align-items-center gap-3">
                        <img src={Image} alt="" />
                        <div className="pt-3">
                          <h5 className="m-0">{name}</h5>
                          <p>{position}</p>
                        </div>
                      </div>
                      <img src={arrow} alt="" />
                    </div>
                  );
                })}
              </div>
              <div className="border p-3 rounded  col-4 teams">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h2>Operations Team</h2>
                    <p>20 Members</p>
                  </div>
                  <Link
                    className="text-primary"
                    onClick={() => setModalShow3(true)}
                  >
                    View All
                  </Link>
                  <MyVerticallyCenteredModal
                    show={modalShow3}
                    onHide={() => setModalShow3(false)}
                  />
                </div>
                <hr />
                {teams.map((teams) => {
                  const { id, name, position, Image } = teams;
                  return (
                    <div
                      key={id}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <div className="d-flex align-items-center gap-3">
                        <img src={Image} alt="" />
                        <div className="pt-3">
                          <h5 className="m-0">{name}</h5>
                          <p>{position}</p>
                        </div>
                      </div>
                      <img src={arrow} alt="" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default Teams;
