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
import './login.css'

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


  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/sudoku");
  }

  const handleShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  }

  const handleChange = (e) => {
      setData({...data, [e.target.name] : e.target.value});
  }

  

  return (
    <Container>
      <Paper>
        <form onSubmit={handleSubmit}>
          <Grid>
            <Typography variant="h4" className="loginTitle">
              Sign up
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
            <TextField
              className="field"
              name="password"
              variant="outlined"
              required
              fullWidth
              label="Repeat Password"
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
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};
export default Signup;
