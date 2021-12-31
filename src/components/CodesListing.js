import { Box, Card, CardContent, Container, Grid, Typography } from "@mui/material"
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
        <div style={{marginLeft:'5px'}}>
            <Typography variant="h5" sx={{mt:2, mb:1}}>Listing Codes:</Typography>
            {array.length > 0 &&
                array.map((ele, i) => {
                    return <Box width='100%' sx={{border: 1, borderColor: 'error.main', borderRadius: 2, mb: 2, p: 2 }} key={i}>
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
                    // return <div key={i} style={{ border: '2px solid', padding: '5px', margin: '5px' }}>
                    //     <code>{ele.title}</code><br />
                    //     <code>{i + 1} {ele.statement}</code><br />
                    //     {admin && <CodeItem snippets={ele.snippets} />}
                    //     <Link to='#' onClick={(e)=>{
                    //         props.handleShow()
                    //         props.history.push(`/codes/${ele._id}`)
                    //     }} >Show</Link><br />       
                    // </div>
                })
            }
        </div>
    )
}
export default CodesListing