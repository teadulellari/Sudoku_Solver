import React, { useState } from "react";
import { AppBar, Typography, Button, Toolbar } from "@mui/material";
import sudokuImg from "../../images/sudoku.png";
import "./navbar.css";

const Navbar = () => {
  return (
    <AppBar id="navbarAppBar">
        
      <div id="leftNavbar">
        <img src={sudokuImg} id="logo" />
        <Typography variant="h6"  to="/" fontWeight="bold" id="title">
          Sudoku Solver
        </Typography>
      </div>
      <Toolbar id="navbarToolbar">
        <Typography id="navbarName">Name here</Typography>
        <Button variant="contained" id="navbarLoginButton" color="secondary">
          Logout
        </Button>
      </Toolbar>
    
    </AppBar>
  );
};

export default Navbar;

