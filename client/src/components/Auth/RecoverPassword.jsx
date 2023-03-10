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
import "./login.css";
import { useNavigate, useParams } from "react-router-dom";
import { recoverPass } from "../../api";

let initialState = { password: "", repeatPassword: "" };

const RecoverPassword = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [answer, setAnswer] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState(initialState);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (data.password !== data.repeatPassword) {
        throw new Error("Passwords don't match.");
      }

      const response = await recoverPass(id, data);

      if (response.status === 200) {
        setAnswer("Your credentials were saved, please login");
        setTimeout(() => {
          navigate("/login");
        }, 3000); // delay navigation by 30 seconds
      }
    } catch (error) {
      if (error.name !== "AxiosError") setAnswer(error.message);
      else if (error.response.status === 403) {
        setAnswer("The recovery link has expired");
      } else {
        setAnswer("Something went wrong.");
      }
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
