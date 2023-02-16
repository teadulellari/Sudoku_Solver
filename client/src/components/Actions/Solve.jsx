import React from "react";
import {Button} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { solveSudoku } from '../../api/index';


const Solve = ({ gridVal }) => {

  const navigate = useNavigate();

    const handleClick = async (e) => {
      e.preventDefault();
      try {
        console.log("This is grid in the Solve file")
    console.log(gridVal);
     const response =  await solveSudoku(gridVal);
     console.log("This is the response")
     console.log(response.data);
     navigate('/solve');
        
      } catch (error) {
        console.log(error);
      }
    }

    return (
      <Button 
       className="solveButton"
       type="submit"
       variant="contained"
       color="secondary"
        onClick={handleClick}>
        Solve</Button>

    );
};

export default Solve;