import React, { useState } from "react";
import { Link } from "react-router-dom";
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


  return (
    // <div className=" ">
      <div className=" flex justify-center  w-full">
        <h1 className="font-bold text-2xl justify-center flex">
          <a style={{ padding: "1rem 1rem" }} href="/">
            REVIEW<span className="navbar-sign ">X</span>PERT
          </a>
        </h1>
      {/* </div> */}
    </div>
  );
}

export default Navbar;
