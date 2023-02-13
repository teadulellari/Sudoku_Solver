import React, { useState } from 'react';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { checkSudoku } from '../../api/index';

const Check = ({ gridVal }) => {

  const navigate = useNavigate();

  const handleClick = async (e) => {
    
    e.preventDefault();
   try {
    console.log("This is grid in the Check file")
    console.log(gridVal);
    const response = await checkSudoku({gridVal});
    console.log("2")
    console.log(response);
    console.log(response.data);
    navigate('/check');
   } catch (error){
    console.error(error);
   }
   
 
    
  };

    return (
        <Button 
          className='checkButton'
          type='submit'
          variant="contained"
          color="secondary"
          onClick={handleClick}
          >Check</Button>
    );
};

export default Check;