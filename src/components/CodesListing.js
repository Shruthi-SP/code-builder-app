import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import CodeItem from "./CodeItem"

const CodesListing = (props) => {
    console.log('CodesListing props=', props)
    const { admin } = props

    const codes = useSelector((state) => {
        console.log(state.codes)
        return state.codes.data
    })

    const [array, setArray] = useState(codes)

    useEffect(() => {
        setArray(codes)
    }, [codes])

    useEffect(() => {
        props.handleCancelShow()
        props.handleCancelPreview()
    })

    return (
        <>{
            array.length === 0 ? <div><h2>CodeListing crashed! No array of codes</h2></div> : <div style={{ marginLeft: '5px' }}>
                <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>Listing Codes:</Typography>
                {array.length > 0 &&
                    array.map((ele, i) => {
                        return <Box width='100%' sx={{ border: 1, borderColor: 'error.main', borderRadius: 2, mb: 2, p: 2 }} key={i}>
                            <>
                                <Typography variant="h6" >{ele.title}</Typography>
                                <Typography variant="h6">{i + 1}. {ele.statement}</Typography>
                                {admin && <CodeItem snippets={ele.snippets} />}
                                <br /><Link to='#' onClick={(e) => {
                                    props.handleShow()
                                    props.history.push(`/codes/${ele._id}`)
                                }} >Solve</Link><br />
                            </>
                        </Box>
                    })
                }
            </div>
        }</>
    )
}
export default CodesListing