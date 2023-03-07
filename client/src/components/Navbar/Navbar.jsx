import React, { useContext } from "react";
import { Typography, Button, Toolbar, Hidden } from "@mui/material";
import sudokuImg from "../../images/sudoku.png";
import "./navbar.css";
import AuthContext from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.setLoggedIn(false);
    navigate("/login");
  };

  return (
    <div id="navbar">
      <Toolbar id="navbarAppBar">
        <img src={sudokuImg} id="logo" alt="sudoku logo" />
        <Hidden xsDown>
          <Typography variant="h6" to="/sudoku" fontWeight="bold" id="title">
            Sudoku Solver
          </Typography>
        </Hidden>
      </Toolbar>
      {auth.loggedIn && (
        <Toolbar id="navbarToolbar">
          <Hidden xsDown>
            <Typography id="navbarName">{auth.userData.name}</Typography>
          </Hidden>
          <Button
            variant="contained"
            id="navbarLoginButton"
            color="secondary"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      )}
    </div>
  );
};

export default Navbar;
