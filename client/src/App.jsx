import logo from "./logo.svg";
import "./App.css";
import LoginView from "./components/View/LoginView";
import SignupView from "./components/View/SignupView";
import Home from './components/View/Home'
import { Container } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Container maxWidth="xl" zeroMinWidth>
        <Routes>
        <Route path='/sudoku' exact element={<Home /> } />
        <Route path="/login" exact element={<LoginView />} />
        <Route path="/signup" exact element={<SignupView />} />

        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
