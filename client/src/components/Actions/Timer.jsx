import React from "react";
import { Button, Grid, Typography } from "@mui/material";

const Timer = () => {
  const startTimer = (e) => {
    e.preventDefault();
    console.log("You started the timer");
  };

  return (
    <>
      <Button
        className="solveButton"
        type="submit"
        variant="contained"
        color="secondary"
        onClick={startTimer}
      >
        Start Timer{" "}
      </Button>
      <Typography>timer here</Typography>
    </>
  );
};

export default Timer;
