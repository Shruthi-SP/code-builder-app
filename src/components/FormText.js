import { useState } from "react"
import { Button, TextField, Typography } from "@mui/material"

const FormText = (props) => {
    console.log('formtxt props', props)
    const { handleCancelText, handleCancelEdit, formSubmission, value: editTxt, hint: editHint, explanation: editExplain } = props

    const [txt, setTxt] = useState(editTxt ? editTxt : '')
    const [hint, setHint] = useState(editHint ? editHint : '')
    const [explain, setExplain] = useState(editExplain ? editExplain : '')

    const handleSubmit = (e) => {
        e.preventDefault()
        const obj = {
            group: 'texts',
            value: txt,
            hint: hint,
            explanation: explain
        }
        console.log('obj=', obj)
        formSubmission(obj)
    }

    return <div style={{ margin: '10px' }}>
        <Typography variant="h5" mb={1}>Text Form</Typography>
        <form onSubmit={handleSubmit}>

            <TextField label='Enter text' variant='outlined' type='text' value={txt} onChange={(e)=>{setTxt(e.target.value)}}></TextField><br /><br />

            <TextField label='Enter hint' variant='outlined' type='text' value={hint} onChange={(e)=>{setHint(e.target.value)}} ></TextField> <br /><br />

            <TextField label='Enter explanation here' variant='outlined' type='text' value={explain} onChange={(e)=>{setExplain(e.target.value)}} ></TextField> <br /><br />

            <Button sx={{ mr: 1 }} type="submit" variant="contained" color="primary" size="small">Submit</Button>

            {editTxt ? <Button variant="contained" size="small" onClick={()=>{handleCancelEdit()}}>Cancel</Button> : <Button variant="contained" size="small" onClick={()=>{handleCancelText()}}>Cancel</Button>}

        </form>
    </div>

    // return 
    //<form onSubmit={handleSubmit} >
    //     <input style={{margin:'5px'}} type='text' value={txt} placeholder="enter texts" onChange={(e)=>{setTxt(e.target.value)}} />
    //     <input style={{margin:'5px'}} placeholder="enter hint" type='text' value={hint} onChange={(e)=>{setHint(e.target.value)}} />
    //     <input style={{margin:'5px'}} type='submit' />
    //     {
    //         editTxt ? <button onClick={()=>{handleCancelEdit()}}>Cancel</button> : <button onClick={()=>{handleCancelText()}}>Cancel</button>
    //     }
    // </form>
}
export default FormText