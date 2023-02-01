import React from "react";
import { Container, Grid, AppBar } from "@mui/material";
import Register from "../Auth/Register";

const LoginView = () => {
  return (
    <Container>
      <Grid >
        <AppBar
          className="appBar"
          position="static"
          color="primary"
        />
        <Register />
      </Grid>
    </Container>
  );
};

export default LoginView;