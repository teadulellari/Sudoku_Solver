import logo from "./logo.svg";
import "./App.css";
import LoginView from "./components/View/LoginView";
import { Container } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Routes>
        <Route path='/' exact element={<Navigate to="/sudoku" />} />
          <Route path="/login" exact element={<LoginView />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
