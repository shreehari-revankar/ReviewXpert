import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faSearch,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import "./Styles/Navbar.css";

import { toast } from "react-toastify";




function Navbar() {
  const [nav, setNav] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const openNav = () => {
    setNav(!nav);
  };

  

  return (
    <div className="navbar-section">
      <h1 className="font-bold text-2xl justify-center flex">
          <a style={{ padding: "1rem 1rem" }} href="/">
            REVIEW<span className="navbar-sign ">X</span>PERT
          </a>
        </h1>

      {/* Desktop */}
      <ul className="navbar-items font-bold text-2xl">
        <li>
          <a href="#hero" className="navbar-links">
            Home
          </a>
        </li>
        <li>
          <a href="#services" className="navbar-links">
            What We do
          </a>
        </li>
        <li>
          <a href="#about" className="navbar-links">
            Features
          </a>
        </li>
        <li>
          <a href="#tech" className="navbar-links">
            Technologies
          </a>
        </li>
      </ul>

      <Link to="/Workspace"><button
        className="navbar-btn"
        type="button"
      >
        <FontAwesomeIcon icon={faSearch} /> TRY NOW
      </button></Link>

      {/* Mobile */}
      <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
        <div onClick={openNav} className="mobile-navbar-close">
          <FontAwesomeIcon icon={faXmark} className="hamb-icon" />
        </div>

        <ul className="mobile-navbar-links">
          <li>
            <a onClick={openNav} to="/">
              Home
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#services">
              What We Do
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#about">
              Features
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#tech">
              Technologies
            </a>
          </li>
      
        </ul>
      </div>

      {/* Hamburger Icon */}
      <div className="mobile-nav">
        <FontAwesomeIcon
          icon={faBars}
          onClick={openNav}
          className="hamb-icon"
        />
      </div>
    </div>
  );
}

export default Navbar;