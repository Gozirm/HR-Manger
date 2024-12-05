import React, { useState } from "react";
import searchIcon from "../assets/searchIcon.svg";
import bell from "../assets/Bell.svg";
import arrowDown from "../assets/arrow_drop_down_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import arrowUp from "../assets/arrow_drop_up_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import messageIcon from "../assets/messageIcon.svg";
import "../Styles/Navbar.css";
import AuthDropDown from "../components/AuthDropDown";
import NavOffcanvas from "../components/NavOffcanvas";
import { useAuth } from "../context/AuthProvider";
const NavBar = () => {
  const [isTrue, setisTrue] = useState(false);
  const [image, setImage] = useState(arrowDown);
  const {user, isLoading, logout} = useAuth();
  function handleReveal() {
    if (isTrue) {
      setisTrue(false);
      setImage(arrowDown);
    } else {
      setisTrue(true);
      setImage(arrowUp);
    }
  }
  return (
    <>
      <nav className="container position-sticky top-0 m-auto  bg-white">
        <div className="d-md-flex justify-content-between  mt-3 align-items-center">
          <div className="d-flex gap-2 align-items-center">
            <div className="d-md-none d-sm-block">
            {["start"].map((placement, idx) => (
            <NavOffcanvas key={idx} placement={placement} name={placement} />
          ))}
            </div>
            <form action="" className="form-nav">
              <input
                type="search"
                name=""
                id=""
                placeholder="Search"
                className="search-input"
              />
              <img src={searchIcon} alt="" className="search-icon" />
            </form>
          </div>
          <div className="d-none d-md-block">
            <div className="d-flex justify-content-between gap-4 align-items-center nav-side">
              <img src={bell} alt="" />
              <img src={messageIcon} alt="" />
              <div className="d-flex align-items-center gap-2 ">
                <img src={user && user?.profileImage} alt="" className="profileImage" />
                <h4 className="username mt-1">{user && user?.firstName}</h4>
                <img
                  onClick={handleReveal}
                  src={image}
                  alt=""
                  className="nav"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="dropDown">{isTrue && <AuthDropDown />}</div>
      </nav>
    </>
  );
};

export default NavBar;
