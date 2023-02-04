import React from "react";
import { Grid, Paper, Typography, Divider, Container } from "@mui/material";
import './alert.css'

const Alert = () => {


    return (
   <Container maxWidth="xl" id="alertContainer">
    <Paper id="alertPaper">
    <Typography variant="h6" id="alertText">
          Alerts here
        </Typography>
    </Paper>
   </Container>
    );
}
export default Alert;