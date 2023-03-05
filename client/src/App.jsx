import React, { useState } from 'react';
import logo from "./logo.svg";
import "./App.css";
import LoginView from "./components/View/LoginView";
import SignupView from "./components/View/SignupView";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Register";
import Home from "./components/View/Home";
import Verify from "./components/Auth/Verify";
import { Container } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthContext from './components/Contexts/AuthContext';

function App() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [userData, setUserData] = useState(null);

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{loggedIn, userData, setLoggedIn, setUserData}}>
        <Container id="muiContainer">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/signup" exact element={<Signup />} />
            <Route path="/check" exact element={<Home />} />
            <Route path="/solve" exact element={<Home />} />
            <Route path="/verify/:uuid" exact element={<Verify />} />
            <Route path="/user/:uuid" exact element={<Home />} />
          </Routes>
        </Container>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
