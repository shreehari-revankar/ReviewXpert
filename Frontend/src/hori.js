import React from 'react';
import axios from 'axios';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from 'react-router-dom';
import "./Styles/horizontal.css";


function formatTime(seconds) {
  const date = new Date(seconds);
  const formattedDate = date.toLocaleString(); // Use toLocaleString() to format date
  return formattedDate;
}


const HorizontalBars = ({data}) => {
  
  const navigate = useNavigate();
  const handleTileClick = async (tileId) => {
    try {
      navigate('/Analysis', { state: { data: tileId} });

      // Perform additional actions if needed
    } catch (error) {
      console.error('Error selecting tile:', error);
    }
  };

  return (
    <div>
      <TableContainer component={Paper} sx={{ border: '1px solid #e0e0e0' }}>
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
        {data.map(item => (
          <TableRow key={item.id}  >
            <TableCell align="left" onClick={() => handleTileClick(item)}>{item.hashtag}</TableCell>
            <TableCell align="right">{item.platform}</TableCell>
            <TableCell align="right">{formatTime(item.time.$date)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      </Table>
      </TableContainer>
    </div>
  );
};

export default HorizontalBars;
