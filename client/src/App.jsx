import logo from "./logo.svg";
import "./App.css";
import LoginView from "./components/View/LoginView";
import SignupView from "./components/View/SignupView";
import Home from './components/View/Home'
import Verify from "./components/Auth/Verify";
import { Container } from "@mui/material";
import { BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Container id="muiContainer">
        <Routes>
        <Route path='/' exact element={<Home /> } />
        <Route path="/login" exact element={<LoginView />} />
        <Route path="/signup" exact element={<SignupView />} />
        <Route path="/check" exact element={<Home />} />
        <Route path="/solve" exact element={<Home />} />
        <Route path="/signup/email" exact element={<Verify/>} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
