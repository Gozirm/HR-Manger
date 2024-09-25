import React from "react";
import lady from "../assets/lady.svg";
import searchIcon from "../assets/searchIcon.svg";
import bell from "../assets/Bell.svg";
import arrowDown from "../assets/arrowDown.svg";
import messageIcon from "../assets/messageIcon.svg";
import "../Styles/Navbar.css"
const NavBar = () => {
  return (
    <>
      <nav className="mb-lg-5 container">
        <div className="d-md-flex justify-content-between  mt-3 align-items-center">
          <form action="" className="form-nav">
            <input type="search" name="" id="" placeholder="Search" className="search-input"/>
            <img src={searchIcon} alt="" className="search-icon" />
          </form>
          <div>
            <div className="d-flex justify-content-between gap-4 align-items-center nav-side">
              <img src={bell} alt="" />
              <img src={messageIcon} alt="" />
              <div className="d-flex align-items-center gap-3">
                <img src={lady} alt="" />
                <h4 className="username mt-1">Gozirim Graphic</h4>
                <img src={arrowDown} alt="" />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
