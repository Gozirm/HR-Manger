import React from "react";
import { Outlet } from "react-router-dom";
import { sidebarLinks } from "../db";
import logo from "../assets/logo-svg.svg";
import arrowUp from "../assets/Vector.svg";
import arrowDown from "../assets/Vector (1).svg";
import "../Styles/AdminDashboard.css";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import NavBar from "../layout/NavBar";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
const AdminDashboard = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <main className="container-fluid d-flex admin-main">
        {/* main-section */}
        <section className=" admin-body d-none d-md-block d-flex row">
          {/* Logo */}
          <div className="d-flex justify-content-between align-items-center mb-5">
            <div className="d-flex gap-2 ">
              <img src={logo} alt="logo" className="logo-dash" />
              <div className="pt-3">
                <h2 className="h2-admin m-0">HR Manger</h2>
                <p className="p-admin">hrmanager@yahoo.com</p>
              </div>
            </div>
            {/* ARROW */}
            <div className="ms-2">
              <div>
                <img src={arrowUp} alt="" />
              </div>
              <div>
                <img src={arrowDown} alt="" />
              </div>
            </div>
          </div>
          {/* MAIN SECTION */}
          <section className="main-section">
            <h3 className="mb-4 main-tag">MAIN MENU</h3>
            <div>
              {sidebarLinks.map((sidebarLinks) => {
                const { id, icon, name, path, activeIcon } = sidebarLinks;
                return (
                  <NavLink key={id} to={path} end>
                    {({ isActive }) => (
                      <section
                        className={`btn-admin  d-flex gap-2 align-items-center ${
                          isActive ? "active" : ""
                        }`}
                      >
                        <img
                          src={isActive ? activeIcon : icon}
                          className="icon-img"
                        />
                        <h6 className="names mt-2"> {name}</h6>
                      </section>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </section>
          {/* Main ========================== */}
        </section>
        {/* section-2 */}
        <section className="px-lg-5  w-100 nav-out">
          <NavBar />
          <Outlet />
        </section>
      </main>
    </>
  );
};

export default AdminDashboard;
