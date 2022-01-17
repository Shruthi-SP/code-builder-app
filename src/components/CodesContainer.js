import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
//import { useDispatch } from "react-redux"
import { Link, Route, withRouter } from "react-router-dom"
import { asyncGetAllCodes } from "../actions/codesAction"
import { asyncSetUser, removeUser } from "../actions/userAction"
import Login from "./user/Login"
import Register from "./user/Register"
import AddCode from "./AddCode"
//import CodePreview from "./CodePreview"
//import { asyncGetAllCodes } from "../actions/codesAction"
//import CodesForm from "./CodesForm"
import CodesListing from "./CodesListing"
import CodeSnippets from "./CodeSnippets"
import ErrorBoundary from "./ErrorBoundary"
import PrivateRoute from "./tools/PrivateRoute"

const CodesContainer = (props) => {
    console.log('codes container props', props)
    //const { userLoggedIn, handleLoggedIn, admin, handleAdmin, getData } = props
    const [show, setShow] = useState(false)
    // useEffect(() => {
    //     if (localStorage.getItem('codeId') !== null) {
    //         props.history.push(`/codes/${(localStorage.getItem('codeId'))}`)
    //     }
    // }, [])

    ///const [preview, setPreview] = useState(false)
    const [admin, setAdmin] = useState(false)
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    //const [isUser, setIsUser] = useState(false)

    const handleLoggedIn = () => {
        setUserLoggedIn(!userLoggedIn)
    }
    const handleAdmin = (isAdmin) => {
        setAdmin(isAdmin)
    }
    const handleLogout = () => {
        localStorage.clear()
        //localStorage.removeItem('user')
        dispatch(removeUser())
        setAdmin(false)
        setUserLoggedIn(false)
        props.history.push('/')
        alert('successfully logged out')
    }

    const getData = (obj) => {
        if (obj.role === 'admin') {
            handleAdmin(true)
        }
        setUserLoggedIn(true)
    }
    const dispatch = useDispatch()
    useEffect(() => {
        const obj = JSON.parse(localStorage.getItem('user'))
        if (localStorage.user) {
            dispatch(asyncSetUser(obj, getData))
        }
    }, [])

    const handleShow = (e) => {
        e.preventDefault()
        setShow(true)
    }
    const handleCancelShow = () => {
        setShow(false)
    }

    return (
        <>
            {
                (userLoggedIn) ?
                    <div style={{ marginTop: '5px' }}>
                        <Link style={{ margin: '5px' }} to='/codes' >Codes List</Link>
                        {admin && <Link style={{ margin: '5px' }} to='/create-code'>Create Code </Link>}
                        {show && <Link style={{ margin: '5px' }} to='/codes/:id'>Snippet </Link>}
                        <Link style={{ margin: '5px' }}
                            to='#' onClick={handleLogout}>Logout</Link>
                    </div>
                    :
                    <div>
                        {/* <Login {...props} getData={getData} handleLoggedIn={handleLoggedIn} handleAdmin={handleAdmin} /> */}
                        <Link style={{ margin: '5px' }} to='/register'> Register</Link>
                        <Link style={{ margin: '5px' }} to='/login'>Login</Link>
                    </div>
            }
            <Route path='/register' component={Register}></Route>
            <Route path='/login' render={(props) => {
                return <Login {...props} handleLoggedIn={handleLoggedIn} getData={getData} handleCancelShow={handleLoggedIn} handleAdmin={handleAdmin} />
            }}></Route>

            {/* <PrivateRoute path='/codes' component={CodesListing} admin={admin} handleShow={handleShow} handleCancelShow={handleCancelShow} {...props}/>
            <PrivateRoute path='/create-code' component={AddCode} />
            <PrivateRoute path='/codes/:id' component={CodeSnippets} /> */}
            <ErrorBoundary><Route path='/codes' exact render={(props) => {
                return <CodesListing {...props} admin={admin} handleShow={handleShow} handleCancelShow={handleCancelShow} />
            }}></Route></ErrorBoundary>
            <ErrorBoundary><Route path='/create-code' exact render={(props) => {
                return <AddCode {...props} handleShow={handleShow} handleCancelShow={handleCancelShow} />
            }}></Route></ErrorBoundary>
            <ErrorBoundary><Route path='/codes/:id' exact render={(props) => {
                return <CodeSnippets {...props} admin={admin} />
            }} ></Route></ErrorBoundary>
        </>
    )
}
export default withRouter(CodesContainer)