import { useState } from "react"
import { Button, TextField, Typography } from "@mui/material"

const FromInput = (props) => {
    console.log('formInput props=', props)
    const {handleCancelInput, handleCancelEdit, formSubmission, answer:editAns, hint:editHint, hints:editHints} = props
    const [ans, setAns] = useState(editAns ? editAns : '')
    const [hint, setHint] = useState(editHint ? editHint : '')
    const [hints, setHints] = useState(editHints ? editHints : [])
    const [err, setErr] = useState({})
    const errors = {}

    const runValidation = () => {
        if(ans.trim().length === 0){
            errors.ans = 'answer is required'
        }
    }

    const handleAddHints = (e) => {
        e.preventDefault()
        runValidation()
        if (Object.keys(errors).length === 0) {
            setErr({})
            const h = {
                hint: hint
            }
            const newHints = [...hints, h]
            console.log('hints[]=', newHints)
            setHints(newHints)
            //alert('hint added')
            setHint('')
        } else {
            setErr(errors)
        }
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        runValidation()
        if (Object.keys(errors).length === 0) {
            setErr({})
            const obj = {
                value: '',
                group: 'input',
                hints: hints,
                answer: ans,
                isDisable: false
            }
            console.log('Form IP on submit obj=', obj)
            formSubmission(obj)            
        } else {
            setErr(errors)
        }
    }
    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     const obj = {
    //         value: '',
    //         group: 'input',
    //         hint: hint,
    //         type: 'input',
    //         answer: ans,
    //         isDisable: false
    //     }
    //     console.log('obj=', obj)
    //     formSubmission(obj)
    // }

    return <div style={{ margin: '10px' }}>
    <Typography variant="h5" mb={1}>Input Form</Typography>
    <form onSubmit={handleSubmit}>

        <TextField label='Enter answer here' variant='outlined' type='text' value={ans} onChange={(e)=>{setAns(e.target.value)}}></TextField><br />
        {err.ans && <span style={{ color: 'red' }}>{err.ans}</span>}<br />

        <TextField label='Enter hint' variant='outlined' type='text' value={hint} onChange={(e)=>{setHint(e.target.value)}} ></TextField> <br /><br />

        <Button sx={{ mr: 1 }} variant="outlined" color="primary" size="small" onClick={handleAddHints}>Add hints</Button><br /><br />

        <Button sx={{ mr: 1 }} type="submit" variant="contained" color="primary" size="small">Submit</Button>

        <Button variant="contained" size="small" onClick={()=>{ editAns ? handleCancelEdit() : handleCancelInput()}}>Cancel</Button>

    </form>
</div>

    // return <form onSubmit={handleSubmit} >
    //     <input style={{margin:'5px'}} type='text' value={ans} placeholder="enter answer here" onChange={(e) => { setAns(e.target.value) }} /><br />
    //     {err.ans && <span style={{ color: 'red' }}>{err.ans}</span>}<br />              
    //     <input style={{margin:'5px'}} type='text' value={hint} placeholder="enter hint here" onChange={(e) => { setHint(e.target.value) }} />
    //     <input style={{margin:'5px'}} type='submit' />
    //     {
    //         <button onClick={()=>{ editAns ? handleCancelEdit() : handleCancelInput() }}>Cancel</button>
    //     }
    //     {/* {
    //         editAns ? <button onClick={()=>{handleCancelEdit()}}>Cancel</button> : <button onClick={()=>{handleCancelInput()}}>Cancel</button>
    //     } */}
    // </form>
}
export default FromInput