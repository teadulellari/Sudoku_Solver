import React from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  Button,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import login from './login.css';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate= useNavigate();
    const showPassword = false;
    const  handleSubmit = () => {
      console.log('Data Submited!')
      navigate('/');
    };

    const  handleChange = () => {
        
    };

    const handleShowPassword = () =>{
        showPassword = true;
       
    };


  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={4} >
        <Typography variant="h1">Log in</Typography>
        <form classname="loginForm" onSubmit={handleSubmit}>
          <Grid>
            <TextField
            className="emailField"
              name="email"
              variant="outlined"
              required
              fullWidth
              label="Email Address"
              onChange={handleChange}
              autoFocus
              autoComplete="email"
              type="email"
            />
            <TextField
            className="passwordField"
              name="password"
              variant="outlined"
              required
              fullWidth
              label="Password"
              onChange={handleChange}
              autoFocus
              type="password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {type === "password" ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button classname="loginButton" type="submit" fullWidth variant="contained" color="primary" > Log in</Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};
export default Login;
