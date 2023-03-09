import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { checkSudoku } from "../../api/index";


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
      console.log(response.status);
    } catch (error) {
      if (error?.response?.status === 400) {
        setLocalValidity(error.response.data);
        console.log(error.response.status);
      } else if (error?.response?.status === 403) {
        navigate("/login");
        console.log(error.response.status);
      }
    }
  };

  useEffect(() => {
    setValidity(validity);
  }, [validity]);

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

export default Check;