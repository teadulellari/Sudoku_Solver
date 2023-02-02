import React from "react";
import {Button} from "@mui/material";


const Solve = () => {
 
    const handleClick = (e) => {
      e.preventDefault();
       console.log("You clicked Solve!");
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