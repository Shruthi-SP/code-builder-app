import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
//import { useDispatch } from "react-redux"
import { Link, Route, withRouter } from "react-router-dom"
import { asyncSetUser, removeUser } from "../actions/userAction"
import Login from "./user/Login"
import Register from "./user/Register"
import AddCode from "./AddCode"
import CodesListing from "./CodesListing"
import StudentsListing from "./StudentsListing"
import CodeSnippets from "./CodeSnippets"
import ErrorBoundary from "./ErrorBoundary"
import PrivateRoute from "./tools/PrivateRoute"
import { Box, Divider, Grid, Typography } from "@mui/material"
import CodeDashboard from "./CodeDashboard"
import Swal from 'sweetalert2'
import StudentProfile from "./StudentProfile"

const CodesContainer = (props) => {
    const [show, setShow] = useState(false)
    const [admin, setAdmin] = useState(false)
    const [userLoggedIn, setUserLoggedIn] = useState(false)

    const dispatch = useDispatch()
    const handleLoggedIn = () => {
        setUserLoggedIn(!userLoggedIn)
    }
    const handleAdmin = () => {
        setAdmin(!admin)
    }

    const user = useSelector(state => {
        return state.user
    })

    useEffect(() => {
        if (Object.keys(user).length > 0) {
            setUserLoggedIn(true)
            if (user.role === 'admin') {
                setAdmin(true)
            }
        }
    }, [user])

    const handleLogout = () => {
        localStorage.clear()
        //localStorage.removeItem('user')
        dispatch(removeUser())
        setAdmin(false)
        setUserLoggedIn(false)
        props.history.push('/')
        //alert('successfully logged out')
        Swal.fire({
            icon: 'success',
            title: 'Logget Out',
            text: 'successfully logged out',
            footer: ''
        })
    }

    const handleShow = () => {
        setShow(true)
    }
    const handleCancelShow = () => {
        setShow(false)
    }

    return (
        <Box>
            {
                (userLoggedIn) ?
                    <div style={{ marginTop: '5px', maxWidth: "100%" }}>
                        <Grid container direction="row" sx={{ mt: 1, mb: 1 }}>
                            <Grid item xs sx={{ display: "flex", justifyContent: "flex-start", }}>
                                <Link style={{ margin: '5px' }} to='/codes' >Codes List</Link>
                                {admin && <Link style={{ margin: '5px' }} to='/create-code'>Create Code </Link>}
                                {admin && <Link style={{ margin: '5px' }} to='/students'>Students List </Link>}
                                {show && <Link style={{ margin: '5px' }} to='/codes/:id'>Snippet </Link>}
                                {!admin && <Link style={{ margin: '5px' }} to='/students/:id'>My-Profile </Link>}
                                <Link style={{ margin: '5px' }} to='/dashboard' >Dashboard</Link>
                            </Grid>
                            <Grid item xs sx={{ display: "flex", justifyContent: "flex-end" }}>
                                <Link style={{ margin: '5px', justifyContent: 'end' }} to='#' onClick={handleLogout}>Logout</Link>
                            </Grid>
                        </Grid>
                    </div>
                    :
                    <div>
                        <Link style={{ margin: '5px' }} to='/register'> Register</Link>
                        <Link style={{ margin: '5px' }} to='/login'>Login</Link>
                    </div>
            }
            {/* <Divider sx={{m:2, ml:0, mr:0}} /> */}
            <Route path='/register' component={Register}></Route>
            <Route path='/login' render={(props) => {
                return <Login {...props} handleLoggedIn={handleLoggedIn} handleCancelShow={handleLoggedIn} handleAdmin={handleAdmin} />
            }}></Route>

            <PrivateRoute path='/codes' component={CodesListing} handleShow={handleShow} handleCancelShow={handleCancelShow} />
            <PrivateRoute path='/students' component={StudentsListing} handleShow={handleShow} handleCancelShow={handleCancelShow} />
            <PrivateRoute path='/create-code' component={AddCode} handleShow={handleShow} handleCancelShow={handleCancelShow} />
            <PrivateRoute path='/codes/:id' component={CodeSnippets} />
            <PrivateRoute path='/students/:id' component={StudentProfile} />
            <PrivateRoute path='/dashboard' component={CodeDashboard} />
        </Box>
    )
}
export default withRouter(CodesContainer)