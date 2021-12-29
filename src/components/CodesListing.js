import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import CodeItem from "./CodeItem"

const CodesListing = (props) => {
    console.log('CodesListing props=', props)
    const {admin} = props
    
    const codes = useSelector((state) => {
        console.log(state.codes)
        return state.codes.data
    })

    const [array, setArray] = useState(codes)

    useEffect(() => {
        setArray(codes)
    }, [codes])

    useEffect(()=>{
        props.handleCancelShow()
        props.handleCancelPreview()
    })

    return (
        <div>
            <h3>Listing Codes</h3>
            { array.length > 0 &&
                array.map((ele, i) => {
                    return <div key={i} style={{ border: '2px solid', padding: '5px', margin: '5px' }}>
                        <code>{ele.title}</code><br />
                        <code>{i + 1} {ele.statement}</code><br />
                        {admin && <CodeItem snippets={ele.snippets} />}
                        <Link to='#' onClick={(e)=>{
                            props.handleShow()
                            props.history.push(`/codes/${ele._id}`)
                        }} >Show</Link><br />       
                    </div>
                })
            }
        </div>
    )
}
export default CodesListing