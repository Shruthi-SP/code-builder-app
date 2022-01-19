import { useState } from "react"
import { Button, TextField, Typography } from "@mui/material"

const FormText = (props) => {
    console.log('formtxt props', props)
    const { handleCancelText, handleCancelEdit, formSubmission, value: editTxt, hint: editHint, hints: editHints} = props

    const [txt, setTxt] = useState(editTxt ? editTxt : '')
    const [hint, setHint] = useState(editHint ? editHint : '')
    const [hints, setHints] = useState(editHints ? editHints : [])
    const [err, setErr] = useState({})
    const errors = {}

    const runValidation = () => {
        if(txt.trim().length === 0){
            errors.txt = 'text is required'
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
                group: 'texts',
                value: txt,
                hints: hints
            }
            console.log('Form text on submit obj=', obj)
            formSubmission(obj)            
        } else {
            setErr(errors)
        }
    }

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     const obj = {
    //         group: 'texts',
    //         value: txt,
    //         hints: hints
    //     }
    //     console.log('obj=', obj)
    //     formSubmission(obj)
    // }

    return <div style={{ margin: '10px' }}>
        <Typography variant="h5" mb={1}>Text Form</Typography>
        <form onSubmit={handleSubmit}>

            <TextField label='Enter text' variant='outlined' type='text' value={txt} onChange={(e)=>{setTxt(e.target.value)}}></TextField><br />
            {err.txt && <span style={{ color: 'red' }}>{err.txt}</span>}<br />

            <TextField label='Enter hint' variant='outlined' type='text' value={hint} onChange={(e)=>{setHint(e.target.value)}} ></TextField> <br /><br />

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