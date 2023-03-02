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
import { useNavigate } from "react-router-dom";
import './register.css';
import './login.css'
import { signUp, verifyUser } from "../../api";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confrimPassword: "",
};
const Signup = () => {
  const [data, setData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    //here to send the email
    try {
      const response = await signUp(data);
    setData(response.data);
    console.log(response.data);
    navigate("/signup/email");
    } catch (error) {
      console.log(error);
    }
    
  }

  const handleShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  }

  const handleChange = (e) => {
      setData({...data, [e.target.name] : e.target.value});
  }
  

  return (
    <Container id="container">
      <Paper elevation={4}  id= "signupPaper">
        <form onSubmit={handleSubmit} className="loginForm">
          <Grid>
            <Typography variant="h4" id="signupTitle">
              Register
            </Typography>
            <Divider className="divider" />
            <TextField
              className="field"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              label="First Name"
              onChange={handleChange}
              autoFocus
              autoComplete="name"
              type="name"
            />
            <Divider className="divider" />
            <TextField
              className="field"
              name="lastName"
              variant="outlined"
              required
              fullWidth
              label="Last Name"
              onChange={handleChange}
              autoFocus
              autoComplete="name"
              type="name"
            />
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
            <TextField
              className="field"
              name="password"
              variant="outlined"
              required
              fullWidth
              label="Repeat Password"
              onChange={handleChange}
              autoFocus
              type="password"
              spacing={2}
            />
            <Divider className="divider" />
            <Button
              className="loginButton field"
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
             
            >
              Sign up
            </Button>
            <Divider className="divider" />
            <Button variant="text" id="buttonField1" >
              Already have an account? Log in
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};
export default Signup;
