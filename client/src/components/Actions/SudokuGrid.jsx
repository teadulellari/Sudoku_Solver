import React, {useState, useEffect} from "react";
import { TextField } from "@mui/material";
import "./grid.css";



const SudokuGrid = () => {
  const rows = 9;
  const columns = 9;
  let gridArray;
  let reg = new RegExp('^[1-9]$');
  //const [gridVal, setGridVal]= useState(Array(rows).fill(Array(columns).fill()));
  const [gridVal, setGridVal]= useState(Array.from(Array(rows), () => new Array(columns).fill('')));
  return (
    <div id="dataContainer" elevation={4}>
      {gridArray=Array.from({ length: rows }, (_, rowIndex) => (
          
           Array.from({ length: columns }, (_, colIndex) => (
            <TextField 
            variant="outlined" id="dataCell" 
            key={`${rowIndex}${colIndex}`} 
            onChange={ (e) => {
             if(reg.value.match(e)===true)
             console.log(reg.test(e))
              gridVal[rowIndex][colIndex] = e.target.value
              setGridVal(gridVal); 
            console.log(gridVal)
          console.log(rowIndex)
          console.log(colIndex)
          console.log(reg.value.match(e))}
             }
              />
          ))
      ))}
    </div>
  );
};

export default SudokuGrid;
