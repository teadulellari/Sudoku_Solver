import React, { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import { verifyUser } from "../../api";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await verifyUser(uuid);

        if (response.status === 200) {
          setAnswer("Your account is activated, please login");
          setTimeout(() => {
            navigate("/login");
          }, 3000); // delay navigation by 30 seconds
        } else if (response.status === 401) {
          setAnswer("Your token has expired");
        } else if (response.status === 400) {
          setAnswer("Your account doesn't exist");
        }
      } catch (error) {
        //if the verification is not successful we tell user to login again?
        setAnswer("There was an error verifying your account.");
      }
    };
    verify();
  }, [uuid, navigate]);

  return (
    <Container>
      <Typography>{answer}</Typography>
    </Container>
  );
};

export default Verify;
