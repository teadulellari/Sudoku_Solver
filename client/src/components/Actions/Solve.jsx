import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { solveSudoku } from "../../api/index";

const Solve = ({ gridVal, setGridVal }) => {
  const rows = 9;
  const columns = 9;
  const navigate = useNavigate();
  const [localGridVal, setLocalGridVal] = useState(
    Array.from(Array(rows), () => new Array(columns).fill(""))
  );

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await solveSudoku(gridVal);
      setLocalGridVal(response.data);
      navigate("/solve");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400 || error.response.status === 403) {
          setLocalGridVal(error.response.data);
          if (error.response.status === 403) {
            navigate('/login');
          }
        } else {
          console.error("Error occurred while solving sudoku:", error);
        }
      } else {
        console.error("Error occurred while solving sudoku:", error);
      }
    }
  };

  useEffect(() => {
    setGridVal(localGridVal);
  }, [localGridVal, setGridVal]);

  return (
    <Button
      className="solveButton"
      type="submit"
      variant="contained"
      color="secondary"
      onClick={handleClick}
    >
      Solve
    </Button>
  );
};

export default Solve;