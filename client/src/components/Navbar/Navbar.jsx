import React, { useState } from "react";
import { AppBar, Typography, Button, Toolbar, Hidden } from "@mui/material";
import sudokuImg from "../../images/sudoku.png";
import "./navbar.css";

const Navbar = () => {
  return (
    <div>
      <Toolbar id="navbarAppBar">
        <img src={sudokuImg} id="logo" />
        <Hidden xsDown>
          <Typography variant="h6" to="/sudoku" fontWeight="bold" id="title">
            Sudoku Solver
          </Typography>
        </Hidden>
      </Toolbar>

      <Toolbar id="navbarToolbar">
        <Hidden xsDown>
          <Typography id="navbarName">Name here</Typography>
        </Hidden>
        <Button variant="contained" id="navbarLoginButton" color="secondary">
          Logout
        </Button>
      </Toolbar>
    </div>
  );
};

export default Navbar;
