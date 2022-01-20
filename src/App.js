import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { asyncSetUser } from "./actions/userAction";
import { Container, Typography } from "@mui/material";
import CodesContainer from "./components/CodesContainer";

function App(props) {
  return (
    <Container>
      <Typography variant="h4" style={{margin:'10px',textAlign: 'center'}}>Code Builder App</Typography>
      <CodesContainer {...props}/>
    </Container>
  );
}

export default withRouter(App);