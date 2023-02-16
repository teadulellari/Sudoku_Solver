import React, { useState, useEffect } from 'react';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { checkSudoku } from '../../api/index';

const Check = ({ gridVal, setValidity }) => {

  const navigate = useNavigate();
  const [validity, setLocalValidity] = useState();

  const handleClick =  async (e) => {
    
    e.preventDefault();
  
    console.log("This is grid in the Check file")
    console.log(gridVal);
    const response =  await checkSudoku(gridVal);
    console.log("This is the response")
    console.log(response.data)
    setLocalValidity(response.data);
    navigate('/check');
   
  };

  useEffect(() => {
    setValidity(validity);
  }, [validity]);

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