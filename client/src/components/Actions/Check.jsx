import React, { useState } from 'react';
import { Button } from "@mui/material";
import SudokuGrid from './SudokuGrid';
import { checkSudoku, createSudoku } from '../../api/index';
import { useNavigate } from "react-router-dom";



const Check = () => {

  const [gridVal, setGridVal] = useState(" ");
  const navigate = useNavigate();

  const handleClick = async (e) => {
 
    e.preventDefault();
    const result =  await checkSudoku(gridVal);

    navigate('/sudoku/check');
    console.log(result);

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