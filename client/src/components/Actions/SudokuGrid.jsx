import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import "./grid.css";
import Check from "./Check";

const SudokuGrid = () => {
  const rows = 9;
  const columns = 9;
  let gridArray;
  let reg = new RegExp("^[1-9]$");
  //const [gridVal, setGridVal]= useState(Array(rows).fill(Array(columns).fill()));
  const [gridVal, setGridVal] = useState(
    Array.from(Array(rows), () => new Array(columns).fill(""))
  );
  return (
    <div id="dataContainer" elevation={4}>
      {
        (gridArray = Array.from({ length: rows }, (_, rowIndex) =>
          Array.from({ length: columns }, (_, colIndex) => (
            console.log("This is the grid before " + gridVal),
            <TextField
              variant="outlined"
              id="dataCell"
              key={`${rowIndex}${colIndex}`}
              onChange={(e) => {
                gridVal[rowIndex][colIndex] = e.target.value;
                setGridVal(gridVal);
                console.log(gridVal);
                console.log(rowIndex);
                console.log(colIndex);
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
