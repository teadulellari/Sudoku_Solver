import React, { useState, useEffect } from "react";
import { Paper, Typography, Container } from "@mui/material";
import "./alert.css";

const Alert = ({ validity, gridVal }) => {
  //const [showAlert, setShowAlert] = useState(false);

  return (
    <div>
      <Container maxWidth="xl" id="alertContainer">
        <Paper id="alertPaper" elevation={4}>
          <Typography variant="h6" id="alertText">
            {validity === true
              ? "Sudoku is valid!"
              : validity === false
              ? "Sudoku is not valid!"
              : validity === null
              ? null
              : null}
          </Typography>
        </Paper>
      </Container>
    </div>
  );
};

export default Alert;
