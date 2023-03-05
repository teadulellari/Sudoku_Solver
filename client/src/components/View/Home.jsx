import { Grow } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import React, { useState} from "react";
import "./home.css";
import Actions from "../Actions/Actions";
import { Container } from "@mui/system";
import SudokuGrid from "../Actions/SudokuGrid";
import Alert from "../Actions/Alert";


const Home = () => {
  const [gridVal, setGridVal] = useState(Array.from(Array(9), () => new Array(9).fill("")));
  const [validity, setValidity] = useState();
  const [showComponent, setShowComponent] = useState(false);
 

  console.log("this is gridval in Home")
  console.log(gridVal)

  return (
    <Grow in>
      <Container id="muiContainer" >
        <div className="navbarDiv">
          <Navbar  />
        </div>
        <div className="contentDiv">
          <div className="emptyDiv"></div>
          <div className="alertDiv">
          { showComponent && <Alert validity={validity} />}
          </div>
          <div className="sudokuDiv">
            <SudokuGrid gridVal={gridVal} setGridVal={setGridVal} setShowComponent={setShowComponent} />
          </div>
          <div className="actionsDiv">
            <Actions gridVal={gridVal} setGridVal={setGridVal} validity={validity} setValidity={setValidity} setShowComponent={setShowComponent} />
          </div>
        </div>
      </Container>
    </Grow>
  );
};

export default Home;
