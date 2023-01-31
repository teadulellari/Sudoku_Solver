import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Paper,
  IconButton,
  Divider,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import  "./login.css";
import { useNavigate } from "react-router-dom";
import sudokuImg from "../../images/sudoku.png";
import Signup from "./Signup";

const initialState = { email: "", password: "" };

const Login = () => {
  // const navigate= useNavigate();

  const [data, setData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/sudoku');
  };

  const handleSubmitSignup = () => {
    
    console.log("Going to signUp");
    navigate('/signup');
    
  };

  

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });

    console.log(data);
  };

  const handleShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
    
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={4} className="loginPaper">
        <form className="loginForm" onSubmit={handleSubmit}>
          <Grid>
            <img src={sudokuImg} className="logo" />
            <Typography variant="h4" className="loginTitle">
              Log in
            </Typography>
            <Divider className="divider" />
            <TextField
              className="field"
              name="email"
              variant="outlined"
              required
              fullWidth
              label="Email Address"
              onChange={handleChange}
              autoFocus
              autoComplete="email"
              type="email"
              spacing={2}
            />
            <Divider className="divider" />
            <TextField
              className="field"
              name="password"
              variant="outlined"
              required
              fullWidth
              label="Password"
              onChange={handleChange}
              autoFocus
              type={showPassword ? "text" : "password"}
              spacing={2}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Divider className="divider" />
            <Button
              className="loginButton field"
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              {" "}
              Log in
            </Button>
            <Divider className="divider" />
            <Button variant="text" className="field">
              Forgot your password?
            </Button>
            <Button variant="text" className="field" onClick={handleSubmitSignup} >
              Don't have an account? Sign Up
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};
export default Login;
