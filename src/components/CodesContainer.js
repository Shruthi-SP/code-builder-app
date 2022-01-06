import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
//import { useDispatch } from "react-redux"
import { Link, Route } from "react-router-dom"
import { asyncGetAllCodes } from "../actions/codesAction"
import AddCode from "./AddCode"
//import CodePreview from "./CodePreview"
//import { asyncGetAllCodes } from "../actions/codesAction"
//import CodesForm from "./CodesForm"
import CodesListing from "./CodesListing"
import CodeSnippets from "./CodeSnippets"

const CodesContainer = (props) => {

    const [show, setShow] = useState(false)
    const [preview, setPreview] = useState(false)
    const [admin, setAdmin] = useState(true)

    const [code, setcode] = useState([])

    const dispatch = useDispatch()

    const handleShow = () => {
        setShow(true)
    }
    const handleCancelShow = () => {
        setShow(false)
    }
    const handlePreview = () => {
        setPreview(true)
    }
    const handleCancelPreview = () => {
        setPreview(false)
    }

    return (
        <div style={{marginTop:'5px'}}>
            <Link style={{ margin: '5px' }} to='/codes' >Codes List</Link>
            {admin && <Link style={{ margin: '5px' }} to='/create-code'>Create Code </Link>}
            {show && <Link style={{ margin: '5px' }} to='/codes/:id'>Snippet </Link>}
            {preview && <Link style={{ margin: '5px' }} to='/codes/:id/preview'>Code Preview</Link>}

            <Route path='/codes' exact render={(props) => {
                return <CodesListing {...props} admin={admin} handleShow={handleShow} handleCancelShow={handleCancelShow} handlePreview={handlePreview} handleCancelPreview={handleCancelPreview} />
            }}></Route>
            <Route path='/create-code' exact render={(props) => {
                return <AddCode {...props} handleShow={handleShow} handleCancelShow={handleCancelShow} handleCancelPreview={handleCancelPreview} />
            }}></Route>
            <Route path='/codes/:id' exact render={(props) => {
                return <CodeSnippets {...props} admin={admin} handlePreview={handlePreview} />
            }} ></Route>
        </div>
    )
}
export default CodesContainer