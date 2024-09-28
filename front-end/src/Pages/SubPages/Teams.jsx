import React from "react";
import { teams } from "../../db";
import { Link, Outlet } from "react-router-dom";
import arrow from "../../assets/teamArror.svg";
import { useState } from "react";
import addIcon from "../../assets/addIcon.svg";
import { useMatch } from "react-router-dom";
const Teams = () => {
  const [teamsActive, setTeamsActive] = useState(true);
  const match = useMatch("/admin-dashboard/employess/teams");
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
                  <Link className="text-primary">View All</Link>
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
                  <Link className="text-primary">View All</Link>
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
                  <Link className="text-primary">View All</Link>
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
                  <Link className="text-primary">View All</Link>
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
