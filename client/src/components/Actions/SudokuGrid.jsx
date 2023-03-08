import React, { useState, useEffect, useContext} from "react";
import { TextField } from "@mui/material";
import "./grid.css";
import AuthContext from "../Contexts/AuthContext";

const SudokuGrid = ({ gridVal, setGridVal, setShowComponent }) => {
  const rows = 9;
  const columns = 9;
  const auth = useContext(AuthContext);
  console.log(auth.solved)
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

  return (
    <div id="dataContainer" elevation={4}>
      {Array.from({ length: rows }, (_, rowIndex) =>
        Array.from({ length: columns }, (_, colIndex) => (
          <TextField
            variant="outlined"
            id="dataCell"
            key={`${rowIndex}${colIndex}`}
            value={localGridVal[rowIndex][colIndex]}
            onChange={(e) => {
              //const temp = localGridVal.map(x => x)
              //temp[rowIndex][colIndex] = e.target.value;
              if (!/^[1-9]?$/.test(e.target.value)) {
                return;
              }
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
              setShowComponent(false);
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
