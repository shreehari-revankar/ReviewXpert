import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import DatePicker from "react-date-picker";
import Dictionary from "./Dictionary";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";

import { Select, MenuItem } from "@mui/material";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';


import { DatePicker, Space } from "antd";

const Dropdown = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [hashtag, setHashtag] = useState("");
  const [departments, setDepartments] = useState({});
  const navigate = useNavigate();

  const addDepartment = (deptName) => {
    setDepartments({ ...departments, [deptName]: [] });
  };

  const addStudent = (department, studentName) => {
    setDepartments({
      ...departments,
      [department]: [...departments[department], studentName],
    });
    console.log([department]);
  };
  const api = axios.create();
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleHashtagChange = (e) => {
    setHashtag(e.target.value); // Update the state with the new value
  };
  const sub = () => {
    api
.post("/workspace", {
        access_token: localStorage.getItem("access_token"),
        option: selectedOption,
        start: startDate,
        end: endDate,
        hash: hashtag,
        body: JSON.stringify(departments),
      })
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          console.log("send to analysis page");
          
          navigate("/Analysis");
        }
      })
      .catch(function (error) {
        console.log(error.response.data);
        alert("Some error encountered check connectivity.");
      });
  };

  return (
<div className="flex flex-col items-center mt-4 space-y-4">
<div className="flex flex-col space-y-4 px-4 py-2">
      <div className="flex gap-2 ">
      {/* <FormControl sx={{  minWidth: 120 }}> */}
        <Select ca
          value={selectedOption}
          onChange={handleSelectChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            <em>Select Options</em>
          </MenuItem>
          <MenuItem value="Twitter">Twitter/X</MenuItem>
      <MenuItem value="Facebook">Facebook</MenuItem>
      <MenuItem value="Youtube">Youtube</MenuItem>
        </Select>
      {/* </FormControl> */}
            <Button className="" variant="contained" size="large" color="success" onClick={sub}>Submit</Button>
            </div>
    <div className="mt-2 flex flex-col gap-2">
      <div className="">
        <Space direction="vertical">
          <DatePicker onChange={(date) => setStartDate(date)} />
        </Space>
      </div>
      <div className="">
        <Space direction="vertical">
          <DatePicker onChange={(date) => setEndDate(date)} />
        </Space>
      </div>
      </div>

      {/* <form> */}
      <div className="">
      <Box
      component="form"
      sx={{
        '& > :not(style)': { width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
            <TextField id="outlined-basic" label="Enter hashset" variant="outlined"  onChange={handleHashtagChange}
          value={hashtag}/>

          </Box>
          </div>
      {/* </form> */}
      <Dictionary
        departments={departments}
        addDepartment={addDepartment}
        addStudent={addStudent}
      />
    </div>
    </div>
  );
};

export default Dropdown;
