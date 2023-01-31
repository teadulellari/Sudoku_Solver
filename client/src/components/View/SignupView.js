import React from "react";
import { Container, Grid, AppBar } from "@mui/material";
import Signup from "../Auth/Login";

const LoginView = () => {
  return (
    <Container>
      <Grid>
        <AppBar
          className="appBar"
          position="static"
          color="primary"
        />
        <Signup />
      </Grid>
    </Container>
  );
};

export default LoginView;