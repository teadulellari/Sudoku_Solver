import React, { useState } from "react";
import "./App.css";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Register";
import Home from "./components/View/Home";
import Verify from "./components/Auth/Verify";
import { Container } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthContext from "./components/Contexts/AuthContext";
import ForgetPassword from "./components/Auth/ForgetPassword";
import RecoverPassword from "./components/Auth/RecoverPassword";

function App() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [userData, setUserData] = useState(null);

  return (
    <BrowserRouter>
      <AuthContext.Provider
        value={{ loggedIn, userData, setLoggedIn, setUserData }}
      >
        <Container id="muiContainer">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/signup" exact element={<Signup />} />
            <Route path="/check" exact element={<Home />} />
            <Route path="/solve" exact element={<Home />} />
            <Route path="/verify/:uuid" exact element={<Verify />} />
            <Route path="/user/:uuid" exact element={<Home />} />
            <Route path="/recoveryEmail" exact element={<ForgetPassword />} />
            <Route
              path="/recoverAccount/:id"
              exact
              element={<RecoverPassword />}
            />
          </Routes>
        </Container>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
