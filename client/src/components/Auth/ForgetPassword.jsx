import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
} from "@mui/material";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { logIn } from "../../api";
import { checkUser } from "../../api";
let initialState = { email: "" };

const ForgetPassword = () => {
  const [data, setData] = useState(initialState);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //get request to check if
    const encodedEmail = encodeURIComponent(data.email);
    console.log(encodedEmail);
    console.log(data);
    const result = await checkUser(encodedEmail);
  };

  return (
    <Container component="main" id="container" maxWidth="xs">
      <Paper elevation={4} id="loginPaper">
        <form className="loginForm" onSubmit={handleSubmit}>
          <Grid>
            <Typography variant="h6" id="loginTitle">
              Send recovery email
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
            <Button
              className="sendEmailButton field"
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              SEND
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default ForgetPassword;
