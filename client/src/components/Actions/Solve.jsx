import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { solveSudoku } from "../../api/index";

const Solve = ({ gridVal, setGridVal }) => {
  const rows = 9;
  const columns = 9;
  // console.log(gridVal);
  const navigate = useNavigate();
  const [localGridVal, setLocalGridVal] = useState(
    Array.from(Array(rows), () => new Array(columns).fill(""))
  );

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      console.log("This is grid in the Solve file");
      console.log(gridVal);
      const response = await solveSudoku(gridVal);
      // setLocalGridVal(response);
      console.log("This is the response");
      console.log(response.data);
      setLocalGridVal(response.data);
      console.log("this is local gridVal");
      console.log(localGridVal);
      navigate("/solve");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setGridVal(localGridVal);
  }, [localGridVal]);

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
