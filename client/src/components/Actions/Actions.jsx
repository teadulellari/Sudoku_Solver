import { Grid, Paper, Typography, Divider, Container } from "@mui/material";
import React from "react";
import Check from "./Check";
import Solve from "./Solve";
import Timer from "./Timer";
import "./actions.css";
import { TimerContext, exposeStopTimer } from "../Contexts/TimerContext";
import { useState, useRef } from "react";

const Actions = ({
  gridVal,
  setGridVal,
  validity,
  setValidity,
  setShowComponent,
}) => {

  const [timerRunning, setTimerRunning] = useState(false)
  

  console.log("this is the gridval in actions");
  console.log(gridVal);
  return (
    <Container maxWidth="xl" id="actionsContainer">
      <TimerContext.Provider value = {{ timerRunning, setTimerRunning, exposeStopTimer }}>
        <Paper elevation={4} id="actionsPaper">
          <form className="actionsForm">
            <Typography variant="h5" id="actionsTitle">
              Actions:
            </Typography>
            <Divider className="divider" />
            <Check
              gridVal={gridVal}
              setValidity={setValidity}
              setShowComponent={setShowComponent}
            />
            <Divider className="divider" />
            <Solve gridVal={gridVal} setGridVal={setGridVal} timerRunning={timerRunning}/>
            <Divider className="divider" />
            <Timer timerRunning={timerRunning} setTimerRunning={setTimerRunning}/>
          </form>
        </Paper>
      </TimerContext.Provider>
    </Container>
  );
};

export default Actions;
