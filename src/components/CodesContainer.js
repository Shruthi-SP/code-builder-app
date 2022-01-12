import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
//import { useDispatch } from "react-redux"
import { Link, Route, withRouter } from "react-router-dom"
import { asyncGetAllCodes } from "../actions/codesAction"
import { asyncSetUser } from "../actions/userAction"
import Login from "../Login"
import AddCode from "./AddCode"
//import CodePreview from "./CodePreview"
//import { asyncGetAllCodes } from "../actions/codesAction"
//import CodesForm from "./CodesForm"
import CodesListing from "./CodesListing"
import CodeSnippets from "./CodeSnippets"
import ErrorBoundary from "./ErrorBoundary"

const CodesContainer = (props) => {
    console.log('codes container props', props)
    const {userLoggedIn, handleLoggedIn, admin, handleAdmin, getData} = props
    const [show, setShow] = useState(false)
    useEffect(()=>{
        if(localStorage.getItem('codeId')!== null){
            props.history.push(`/codes/${(localStorage.getItem('codeId'))}`)
        }
    }, [])

    ///const [preview, setPreview] = useState(false)
    // const [admin, setAdmin] = useState(false)
    // const [userLoggedIn, setUserLoggedIn] = useState(false)
    //const [isUser, setIsUser] = useState(false)

    // const handleLoggedIn = () => {
    //     setUserLoggedIn(!userLoggedIn)
    // }
    // const handleAdmin = (isAdmin) => {
    //     setAdmin(isAdmin)
    // }

    // const getData = (obj) => {
    //     if (obj.role === 'admin') {
    //         handleAdmin(true)
    //     }
    //     handleLoggedIn()
    //     props.history.push('/codes')
    // }

    // const dispatch = useDispatch()

    // useEffect(() => {
    //     const obj = JSON.parse(localStorage.getItem('user'))
    //     if (obj !== null) {
    //         dispatch(asyncSetUser(obj, getData))
    //         console.log('user present')
    //     }
    //     console.log('use effect in container err boundaries')
    // }, [])

    const handleShow = () => {
        setShow(true)
    }
    const handleCancelShow = () => {
        setShow(false)
    }
    // const handlePreview = () => {
    //     setPreview(true)
    // }
    // const handleCancelPreview = () => {
    //     setPreview(false)
    // }

    // return (
    //     <div style={{marginTop:'5px'}}>
    //         <Link style={{ margin: '5px' }} to='/codes' >Codes List</Link>
    //         {admin && <Link style={{ margin: '5px' }} to='/create-code'>Create Code </Link>}
    //         {show && <Link style={{ margin: '5px' }} to='/codes/:id'>Snippet </Link>}
    //         {preview && <Link style={{ margin: '5px' }} to='/codes/:id/preview'>Code Preview</Link>}

    //         <ErrorBoundary><Route path='/codes' exact render={(props) => {
    //             return <CodesListing {...props} admin={admin} handleShow={handleShow} handleCancelShow={handleCancelShow} handlePreview={handlePreview} handleCancelPreview={handleCancelPreview} />
    //         }}></Route></ErrorBoundary>
    //         <ErrorBoundary><Route path='/create-code' exact render={(props) => {
    //             return <AddCode {...props} handleShow={handleShow} handleCancelShow={handleCancelShow} handleCancelPreview={handleCancelPreview} />
    //         }}></Route></ErrorBoundary>
    //         <ErrorBoundary><Route path='/codes/:id' exact render={(props) => {
    //             return <CodeSnippets {...props} admin={admin} handlePreview={handlePreview} />
    //         }} ></Route></ErrorBoundary>
    //     </div>
    // )
    return (
        <>
            {(userLoggedIn) ? <div style={{ marginTop: '5px' }}>
                <Link style={{ margin: '5px' }} to='/codes' >Codes List</Link>
                {admin && <Link style={{ margin: '5px' }} to='/create-code'>Create Code </Link>}
                {show && <Link style={{ margin: '5px' }} to='/codes/:id'>Snippet </Link>}
                {/* {preview && <Link style={{ margin: '5px' }} to='/codes/:id/preview'>Code Preview</Link>} */}

                <ErrorBoundary><Route path='/codes' exact render={(props) => {
                    return <CodesListing {...props} admin={admin} handleShow={handleShow} handleCancelShow={handleCancelShow}/>
                }}></Route></ErrorBoundary>
                <ErrorBoundary><Route path='/create-code' exact render={(props) => {
                    return <AddCode {...props} handleShow={handleShow} handleCancelShow={handleCancelShow} />
                }}></Route></ErrorBoundary>
                <ErrorBoundary><Route path='/codes/:id' exact render={(props) => {
                    return <CodeSnippets {...props} admin={admin} />
                }} ></Route></ErrorBoundary>
            </div>
                :
                <div>
                    <Login {...props} getData={getData} handleLoggedIn={handleLoggedIn} handleAdmin={handleAdmin} />
                </div>
            }
        </>

    )
}
export default withRouter(CodesContainer)