import { Grid, Paper, Typography, Divider, Container } from "@mui/material";
import React from "react";
import Check from "./Check";
import Solve from "./Solve";
import Timer from "./Timer";
import "./actions.css";

const Actions = ({gridVal}) => {
  return (
    <Container maxWidth="xl" id="actionsContainer">
    <Paper elevation={4} id="actionsPaper">
      <form className="actionsForm">
        <Typography variant="h5" id="actionsTitle">
          Actions:
        </Typography>
        <Divider className="divider" />
        <Check gridVal={gridVal} />
        <Divider className="divider" />
        <Solve />
        <Divider className="divider" />
        <Timer />
      </form>
    </Paper>
    </Container>
  );
};

export default Actions;
