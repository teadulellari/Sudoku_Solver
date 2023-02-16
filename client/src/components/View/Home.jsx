import { Grow } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import React, { useState} from "react";
import "./home.css";
import Actions from "../Actions/Actions";
import { Container } from "@mui/system";
import SudokuGrid from "../Actions/SudokuGrid";
import Alert from "../Actions/Alert";

const Home = () => {
  const [gridVal, setGridVal] = useState([]);
  const [validity, setValidity] = useState();

  return (
    <Grow in>
      <Container id="muiContainer" >
        <div className="navbarDiv">
          <Navbar />
        </div>
        <div className="contentDiv">
          <div className="emptyDiv"></div>
          <div className="alertDiv">
           <Alert validity={validity}/>
          </div>
          <div className="sudokuDiv">
            <SudokuGrid setGridVal={setGridVal} />
          </div>
          <div className="actionsDiv">
            <Actions gridVal={gridVal} setGridVal={setGridVal} setValidity={setValidity} validity={validity} />
          </div>
        </div>
      </Container>
    </Grow>
  );
};

export default Home;
