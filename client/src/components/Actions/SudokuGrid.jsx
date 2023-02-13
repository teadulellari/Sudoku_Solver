import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import "./grid.css";

const SudokuGrid = ({ setGridVal }) => {
  const rows = 9;
  const columns = 9;
  let gridArray;
  let reg = new RegExp("^[1-9]$");
  //const [gridVal, setGridVal]= useState(Array(rows).fill(Array(columns).fill()));
  const [gridVal, setLocalGridVal] = useState(
    Array.from(Array(rows), () => new Array(columns).fill(""))
  );
  useEffect(() => {
    setGridVal(gridVal);
  }, [gridVal]);
  return (
    <div id="dataContainer" elevation={4}>
      {
        (gridArray = Array.from({ length: rows }, (_, rowIndex) =>
          Array.from({ length: columns }, (_, colIndex) => (
            <TextField
              variant="outlined"
              id="dataCell"
              key={`${rowIndex}${colIndex}`}
              onChange={(e) => {
                gridVal[rowIndex][colIndex] = e.target.value;
                setLocalGridVal(gridVal);
                console.log("this is grid")
                console.log(gridVal);
              }}
            />
          ))
        ))
      }
     
    </div>
  );
};

export default SudokuGrid;