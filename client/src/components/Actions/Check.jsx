import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { checkSudoku } from "../../api/index";
import mitt from "mitt";
const emitterCheck = mitt();

const Check = ({ gridVal, setValidity, setShowComponent }) => {
  const navigate = useNavigate();
  const [validity, setLocalValidity] = useState(null);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await checkSudoku(gridVal);
      setLocalValidity(response.data);
      setShowComponent(true);
      navigate("/check");
      //check if the component is full
      if (response.data === true && isGridFull(gridVal)) {
        //emit the function to stop the timer runnning
        emitterCheck.emit("checkStopTimer");
      }
    } catch (error) {
      if (error?.response?.status === 400) {
        setLocalValidity(error.response.data);
      } else if (error?.response?.status === 403) {
        navigate("/login");
      }
    }
  };

  //check if grid is full
  function isGridFull(gridVal) {
    return gridVal
      .map((row) => row.every((cell) => cell !== ""))
      .every((val) => val);
  }

  useEffect(() => {
    setValidity(validity);
  }, [validity, setValidity]);

  return (
    <Button
      className="checkButton"
      type="submit"
      variant="contained"
      color="secondary"
      onClick={handleClick}
    >
      Check
    </Button>
  );
};

export { Check, emitterCheck };
