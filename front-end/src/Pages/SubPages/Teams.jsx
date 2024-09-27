import React from "react";
import { teams } from "../../db";
import { Link } from "react-router-dom";
import arrow from "../../assets/teamArror.svg";
const Teams = () => {
  return (
    <>
      <main >
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
    </>
  );
};

export default Teams;
