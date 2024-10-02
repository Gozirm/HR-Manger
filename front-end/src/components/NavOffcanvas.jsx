import React from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import menu from "../assets/menu_24dp_E_FILL0_wght400_GRAD0_opsz24.svg";
import { useState } from "react";
import logo from "../assets/logo-svg.svg";
import arrowUp from "../assets/Vector.svg";
import arrowDown from "../assets/Vector (1).svg";
import { sidebarLinks } from "../db";
import { NavLink } from "react-router-dom";

const NavOffcanvas = ({ name, ...props }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div onClick={handleShow}>
        <img src={menu} alt="" className="menu" />
      </div>
      <Offcanvas show={show} onHide={handleClose} {...props}  style={{width:"53%", height: "100%"}}>
        <Offcanvas.Body>
          <section className="d-flex row">
            {/* Logo */}
            <div className="d-flex align-items-center">
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
                    <NavLink key={id} to={path} end onClick={handleClose}>
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
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default NavOffcanvas;
