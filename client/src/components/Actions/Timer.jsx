import React, { useState, useRef, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { emitterSolve } from "./Solve";
import { emitterCheck } from "./Check";

const Timer = () => {
  const [time, setTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);

  const startTimer = (e) => {
    e.preventDefault();
    if (timerRunning) {
      clearInterval(intervalRef.current);
      setTimerRunning(false);
    } else {
      startTimeRef.current = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTimeRef.current);
      }, 1000);
      setTimerRunning(true);
    }
  };

  useEffect(() => {
    const stopTimer = () => {
      if (timerRunning) {
        clearInterval(intervalRef.current);
        setTimerRunning(false);
      }
    };

    emitterCheck.on("checkStopTimer", stopTimer);

    emitterSolve.on("solveStopTimer", stopTimer);

    return () => {
      emitterCheck.off("checkStopTimer", stopTimer);
      emitterSolve.off("solveStopTimer", stopTimer);
    };
  }, [timerRunning]);

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
        {timerRunning ? "Stop Timer" : "Start Timer"}
      </Button>
      <Typography>{formatTime(time)}</Typography>
    </>
  );
};

export default Timer;
