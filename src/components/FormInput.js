import { useState } from "react"
import { useSelector } from "react-redux"
import { Typography, TextField, Button } from "@mui/material"

const FromInput = (props) => {
    console.log('formInput props=', props)
    const {handleCancelInput, handleCancelEdit, formSubmission, answer:editAns, hint:editHint, explanation: editExplain} = props
    const [ans, setAns] = useState(editAns ? editAns : '')
    const [hint, setHint] = useState(editHint ? editHint : '')
    const [explain, setExplain] = useState(editExplain ? editExplain : '')
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const obj = {
            value: '',
            group: 'input',
            hint: hint,
            type: 'input',
            answer: ans,
            isDisable: false,
            explanation: explain
        }
        console.log('obj=', obj)
        formSubmission(obj)
    }

    // return <form onSubmit={handleSubmit} >
    //     <input style={{margin:'5px'}} type='text' value={ans} placeholder="enter answer here" onChange={(e) => { setAns(e.target.value) }} /><br />
    //     <input style={{margin:'5px'}} type='text' value={hint} placeholder="enter hint here" onChange={(e) => { setHint(e.target.value) }} /><br />
    //     <input style={{margin:'5px'}} type='text' value={explain} placeholder="enter explanation here" onChange={(e)=> {setExplain(e.target.value)}} /><br />
    //     <input style={{margin:'5px'}} type='submit' />
    //     {
    //         editAns ? <button onClick={()=>{handleCancelEdit()}}>Cancel</button> : <button onClick={()=>{handleCancelInput()}}>Cancel</button>
    //     }
    // </form>
    return <div style={{ margin: '10px' }}>
        <Typography variant="h5" mb={1}>Text Form</Typography>
        <form onSubmit={handleSubmit}>

            <TextField label='Enter answer here' variant='outlined' type='text' value={ans} onChange={(e)=>{setAns(e.target.value)}}></TextField><br /><br />

            <TextField label='Enter hint here' variant='outlined' type='text' value={hint} onChange={(e)=>{setHint(e.target.value)}} ></TextField> <br /><br />

            <TextField label='Enter explanation here' variant='outlined' type='text' value={explain} onChange={(e)=>{setExplain(e.target.value)}} ></TextField> <br /><br />

            <Button sx={{ mr: 1 }} type="submit" variant="contained" color="primary" size="small">Submit</Button>

            {editAns ? <Button variant="contained" size="small" onClick={()=>{handleCancelEdit()}}>Cancel</Button> : <Button variant="contained" size="small" onClick={()=>{handleCancelInput()}}>Cancel</Button>}

        </form>
    </div>
}
export default FromInput