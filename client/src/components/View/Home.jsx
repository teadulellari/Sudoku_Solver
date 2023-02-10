import { Grow } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import React from "react";
import "./home.css";
import Actions from "../Actions/Actions";
import { Container } from "@mui/system";
import SudokuGrid from "../Actions/SudokuGrid";
import Alert from "../Actions/Alert";

const Home = () => {
  return (
    <Grow in>
      <Container id="muiContainer" >
        <div className="navbarDiv">
          <Navbar />
        </div>
        <div className="contentDiv">
          <div className="emptyDiv"></div>
          <div className="alertDiv">
           <Alert />
          </div>
          <div className="sudokuDiv">
            <SudokuGrid />
          </div>
          <div className="actionsDiv">
            <Actions />
          </div>
        </div>
      </Container>
    </Grow>
  );
};

export default Home;
