import { useState } from "react"
//import { useDispatch } from "react-redux"
import { Link, Route } from "react-router-dom"
//import { asyncGetAllCodes } from "../actions/codesAction"
import CodesForm from "./CodesForm"
import CodesListing from "./CodesListing"
import CodeSnippets from "./CodeSnippets"

const CodesContainer = (props) => {

    const [show, setShow] = useState(false)

    const handleShow = () => {
        setShow(!show)
    }

    return (
        <div>

            <Link style={{ margin: '5px' }} to='/codes' >Codes List</Link> |
            <Link style={{ margin: '5px' }} to='/create-code'>Create Code </Link> |
            {show && <Link style={{ margin: '5px' }} to='/codes/:id'>Create Snippet </Link>}

            <Route path='/codes' exact render={(props) => {
                return <CodesListing {...props} handleShow={handleShow} />
            }}></Route>
            <Route path='/create-code' component={CodesForm} exact></Route>
            <Route path='/codes/:id' component={CodeSnippets} exact></Route>

        </div>
    )
}
export default CodesContainer