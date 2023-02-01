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
    <Container component="main"  id ="container">
      <Paper elevation={4} id="loginPaper">
        <form className="loginForm" onSubmit={handleSubmit}>
          <Grid >
            <img src={sudokuImg} id="loginLogo" alt="sudoku-logo"/>
            <Typography variant="h4" id="loginTitle">
              Log in
            </Typography>
            <Divider className="divider" />
            <TextField
              id="field1"
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
              id="field2"
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
              Log in
            </Button>
            <Divider className="divider" />
            <Button variant="text" id="buttonField1" >
              Forgot your password?
            </Button>
            <Button variant="text" id="buttonField2" onClick={handleSubmitSignup} >
              Don't have an account? Sign Up
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};
export default Login;
