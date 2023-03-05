import React, { useState, useContext } from "react";
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
import { logIn } from "../../api";
import AuthContext from '../Contexts/AuthContext';

const initialState = { email: "", password: "" };

const Login =  () => {
  // const navigate= useNavigate();
  const [data, setData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const auth = useContext(AuthContext);

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await logIn(data);
      console.log(response.status)
      if(response.status === 200){
        auth.setUserData(response.data); // set the response data in the context
        console.log(response.data)
        auth.setLoggedIn(true);
        navigate('/');
        ///here we get the user data from the res
      }
    } catch (error) {
      console.log(error);
      if(error.response.status === 404){
        setResponseMessage("This account doesn't exist. Please create an account.")
        console.log(responseMessage)
      } else if(error.response.status === 401){
        setResponseMessage("Incorrect email or password. Please try again.")
        console.log(responseMessage)
      }else if(error.response.status === 403){
        setResponseMessage("Check your email to activate your account.")
        console.log(responseMessage)
      }
    }
    
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
    <div id="">
      <div id="warningBox">
     {responseMessage && (
      <Typography variant="h6" id="warningMessage">{responseMessage} </Typography>
    )}
    </div>
    <Container component="main"  id ="container" maxWidth="xs">
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
    </div>
  );
};
export default Login;
