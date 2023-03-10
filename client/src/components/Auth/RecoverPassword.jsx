import React, { useState, useEffect } from "react";
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
import "./login.css";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { recoverPass } from "../../api";

let initialState = { password: "", repeatPassword: "" };

const RecoverPassword = () => {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [answer, setAnswer] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState(initialState);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(id)
      const response = await recoverPass(id, data);
      console.log(response.status);
      if (response.status === 200) {
        setAnswer("Your credentials were saved, please login");
        setTimeout(() => {
          navigate("/login");
        }, 3000); // delay navigation by 30 seconds
      }
    } catch (error) {
      console.log(error);
      //if the verification is not successful we tell user to login again?
      setAnswer("Something went wrong.");
    }
  };

  const handleShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  return (
    <Container component="main" id="container" maxWidth="xs">
      <Paper elevation={4} id="loginPaper">
        <Typography>{answer}</Typography>
        <form className="loginForm" onSubmit={handleSubmit}>
          <Grid>
            <Typography variant="h5" id="loginTitle">
              Recover your account
            </Typography>
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
            <TextField
              className="field"
              name="repeatPassword"
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

export default RecoverPassword;
