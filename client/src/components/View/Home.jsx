import { Grow } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import React from "react";
import "./home.css";
import Actions from "../Actions/Actions";
import { Container } from "@mui/system";

const Home = () => {
  return (
    <Grow in>
      <Container>
        <Navbar />
        <Actions />
      </Container>
    </Grow>
  );
};

export default Home;
