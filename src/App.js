import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { asyncSetUser } from "./actions/userAction";
import { Container, Typography } from "@mui/material";
import CodesContainer from "./components/CodesContainer";

function App(props) {
  console.log('App props', props)
  // const [userLoggedIn, setUserLoggedIn] = useState(false)
  // const [admin, setAdmin] = useState(false)
  // const handleLoggedIn = () => {
  //   setUserLoggedIn(!userLoggedIn)
  // }
  // const handleAdmin = (isAdmin) => {
  //   setAdmin(isAdmin)
  // }
  // const getData = (obj) => {
  //   if (obj.role === 'admin') {
  //     handleAdmin(true)
  //   }
  //   handleLoggedIn()
    
  //   if (props.match.params.id) {
  //     props.history.push(`/codes/${props.match.params.id}`)
  //   }
  //   else {
  //     props.history.push('/codes')
  //   }
  // }

  // const dispatch = useDispatch()

  // useEffect(() => {
  //   const obj = JSON.parse(localStorage.getItem('user'))
  //   if (obj !== null) {
  //     dispatch(asyncSetUser(obj, getData))
  //     console.log('user present')
  //   }
  // }, [])

  return (
    <Container>
      <Typography variant="h4">Code Builder App</Typography>
      <CodesContainer {...props}/>
      {/* <CodesContainer admin={admin} handleAdmin={handleAdmin} userLoggedIn={userLoggedIn} handleLoggedIn={handleLoggedIn} getData={getData} /> */}
    </Container>
  );
}

export default withRouter(App);