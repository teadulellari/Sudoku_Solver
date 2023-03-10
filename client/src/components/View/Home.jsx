import { Grow } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import React, { useState, useContext } from "react";
import "./home.css";
import Actions from "../Actions/Actions";
import { Container } from "@mui/system";
import SudokuGrid from "../Actions/SudokuGrid";
import Alert from "../Actions/Alert";
import { useEffect } from "react";
import AuthContext from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { checkSessionValidity } from "../../api";

const Home = () => {
  const [gridVal, setGridVal] = useState(
    Array.from(Array(9), () => new Array(9).fill(""))
  );
  const [validity, setValidity] = useState();
  const [showComponent, setShowComponent] = useState(false);

  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if(!auth.loggedIn){
  //     //check session
  //      navigate('/login');
  //   }
  // });

  //check for existing session
  useEffect(() => {
    const checkSession = async () => {
      try {
        if (!auth.loggedIn) {
          const response = await checkSessionValidity(auth?.userData);
          if (response.status === 200) {
            auth.setLoggedIn(true);
            auth.setUserData(response.data);
            navigate("/");
          }
        }
      } catch (error) {
        auth.setLoggedIn(false);

        navigate("/login");
      }
    };
    checkSession();
  }, [auth, navigate]);

  return (
    <Grow in>
      <Container id="muiContainer">
        <div className="navbarDiv">
          <Navbar />
        </div>
        <div className="contentDiv">
          <div className="emptyDiv"></div>
          <div className="alertDiv">
            {showComponent && <Alert validity={validity} />}
          </div>
          <div className="sudokuDiv">
            <SudokuGrid
              gridVal={gridVal}
              setGridVal={setGridVal}
              setShowComponent={setShowComponent}
            />
          </div>
          <div className="actionsDiv">
            <Actions
              gridVal={gridVal}
              setGridVal={setGridVal}
              validity={validity}
              setValidity={setValidity}
              setShowComponent={setShowComponent}
            />
          </div>
        </div>
      </Container>
    </Grow>
  );
};

export default Home;
