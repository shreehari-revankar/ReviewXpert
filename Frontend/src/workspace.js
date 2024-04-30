import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faSearch,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
import HorizontalBars from "./hori";
import Navbar from "./NavbarSession";

//Table imports
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function Workspace() {
  const [data, setData] = useState([]);
  const [selectedTile, setSelectedTile] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      const response = await axios.post("http://localhost:5000/allworkspace", {
        access_token: access_token,
      });
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="">
      <div className="justify-center flex">
        <Navbar />
      </div>

      <div className="info-title-content h-[300px] mt-0 py-10 mb-2  bg-blue-300">
        <h3 className="info-title flex justify-center">
          <span>What We Do</span>
        </h3>
        <p className="info-description">
          We bring a comprehensive and unified platform solution for analyzing
          social media platforms. Our integrated system simplifies the process
          of monitoring, analyzing, and deriving insights from social media
          data, offering a seamless experience for businesses and organizations.
        </p>
      </div>
      <h2 className=" ml-[150px] text-3xl font-bold mb-3">My Workspaces</h2>

      <div className="flex justify-center mb-2">
        {" "}
        <div className="flex flex-col w-[80%]">
          {/*<TableContainer component={Paper} sx={{ border: '1px solid #e0e0e0' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>HashTag</TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    Platform
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    Time
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                Add table rows here 
                <TableRow>
                  <TableCell align="left">Hashtag1</TableCell>
                  <TableCell align="right">Platform</TableCell>
                  <TableCell align="right">Time</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>*/}
          <HorizontalBars data={data} />
          
        </div>
      </div>
      <div className="flex justify-end w-[90%]">
        <Link to="/AddWorkspace">
          <button className="text-appointment-btn" type="button">
            <FontAwesomeIcon icon={faSearch} /> Add Session
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Workspace;
