import React from 'react';
import { Button } from "@mui/material";




const Check = () => {

 const handleClick = (e) => {
  e.preventDefault();
     console.log("You clicked Check!");
 }

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