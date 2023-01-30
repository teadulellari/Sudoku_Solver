import React from "react";
import { Container, Grid, AppBar } from "@mui/material";
import Login from "../Auth/Login";

const LoginView = () => {
  return (
    <Container>
      <Grid>
        <AppBar
          className="appBar"
          position="static"
          color="inherit"
        />
        <Login />
      </Grid>
    </Container>
  );
};

export default LoginView;
