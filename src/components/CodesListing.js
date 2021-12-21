import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { asyncGetAllCodes } from "../actions/codesAction"
import CodeItem from "./CodeItem"

const CodesListing = (props) => {
    console.log('CodesListing props=', props)

    const dispatch = useDispatch()

    useEffect(() => {
        console.log('dispatching')
        dispatch(asyncGetAllCodes())
    }, [])

    const codes = useSelector((state) => {
        console.log(state.codes)
        return state.codes
    })

    const [array, setArray] = useState(codes)

    return (
        <div>
            <h3>Listing Codes</h3>
            {
                array.map((ele, i) => {
                    return <div key={i} style={{ border: '2px solid', padding: '5px', margin: '5px' }}>
                        <code>{ele.title}</code><br />
                        <code>{i + 1} {ele.statement}</code><br />
                        <CodeItem snippets={ele.snippets} />
                        <Link to='#' onClick={(e)=>{
                            props.handleShow()
                            props.history.push(`/codes/${ele._id}`)
                        }} >Show</Link>       
                    </div>
                })
            }
        </div>
    )
}
export default CodesListing