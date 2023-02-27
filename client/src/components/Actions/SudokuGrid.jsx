import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import "./grid.css";

const SudokuGrid = ({ gridVal, setGridVal }) => {
  const rows = 9;
  const columns = 9;
  console.log("this is gridval in Sudokugrid");
  console.log(gridVal);
  //const [gridVal, setGridVal]= useState(Array(rows).fill(Array(columns).fill()));
  const [localGridVal, setLocalGridVal] = useState(gridVal);
  console.log("this is localGridVal in Sudokugrid");
  console.log(localGridVal);

  useEffect(() => {
    setGridVal(localGridVal);
  }, [localGridVal]);

  useEffect(() => {
    setLocalGridVal(gridVal);
  }, [gridVal]);
  
  const handleKeyPress = (e, rowIndex, colIndex) => {
    const keyValue = e.key;
    if (!/^[0-9]*$/.test(keyValue)) {
      e.preventDefault();
    }
  };

  return (
    <div id="dataContainer" elevation={4}>
      {Array.from({ length: rows }, (_, rowIndex) =>
        Array.from({ length: columns }, (_, colIndex) => (
          <TextField
            variant="outlined"
            id="dataCell"
            key={`${rowIndex}${colIndex}`}
            value={localGridVal[rowIndex][colIndex]}
            onKeyPress={(e) => handleKeyPress(e, rowIndex, colIndex)}
            onChange={(e) => {
              //const temp = localGridVal.map(x => x)
              //temp[rowIndex][colIndex] = e.target.value;
              setLocalGridVal(
                localGridVal.map((row, rowMapIndex) => {
                  if (rowMapIndex !== rowIndex) return row.map((x) => x);
                  else
                    return row.map((col, colMapIndex) => {
                      if (colMapIndex !== colIndex) return col;
                      else return e.target.value;
                    });
                })
              );
              console.log("this is grid");
              console.log(localGridVal);
            }}
          />
        ))
      )}
    </div>
  );
};

export default SudokuGrid;
