import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  Container,
  Typography,
} from "@mui/material";
import { verifyUser } from "../../api";

const Verify = () => {
  const location = useLocation();
  //const uuid = location.pathname.split("/").pop();
  const {uuid} = useParams();

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await verifyUser(uuid);
        console.log(response);
        //if the verification is successful we send user to the main page
      } catch (error) {
        console.log(error);
        //if the verification is not successful we tell user t ologin again?
        
      }
    };
    verify();
  }, [uuid]);

return (
<Container>
    <Typography>
        Verifying user...
   </Typography>

</Container>
);
};
export default Verify;