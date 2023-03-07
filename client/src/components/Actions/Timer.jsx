import React from "react";
import { Button, Typography } from "@mui/material";
import { useState } from "react";

const Timer = ({validity}) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  const startTimer = () => {
    let startTime = Date.now();
    let intervalId = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 1000);

    // Replace the following with your actual action
    setTimeout(() => {
      clearInterval(intervalId);
    }, 5000);
  };

  const stopTimer = () => {
    //stopping the time when the sudoku is full and valid, s owhen it is solved and valid
    if(validity){

    }
  }

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60000);
    let seconds = Math.floor((time % 60000) / 1000);
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };

    return (
      <>
        <Button
          className="timeButton"
          type="submit"
          variant="contained"
          color="secondary"
          onClick={startTimer}
        >
          Start Timer{" "}
        </Button>
        <Typography>{formatTime(elapsedTime)}</Typography>
      </>
    );
  
};
export default Timer;
