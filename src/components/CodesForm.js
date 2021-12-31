import { useState } from "react"
import Button from '@mui/material/Button';
import { Container, TextField, Typography } from "@mui/material";

const CodesForm = (props) => {
    console.log('form props=', props, props.history)
    const { title: editTitle, statement: editStatement, formSubmission, handleCancelCode } = props

    const [title, setTitle] = useState(editTitle ? editTitle : '')
    const [statement, setStatement] = useState(editStatement ? editStatement : '')
    const [err, setErr] = useState({})
    const errors = {}

    const resetForm = () => {
        setStatement('')
        setTitle('')
    }
    const runValidation = () => {
        if(title.trim().length===0){
            errors.title='title cannot be empty'
        }
        if(statement.trim().length === 0){
            errors.statement='statement/question required'
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        runValidation()
        if(Object.keys(errors).length===0){
            const formData = {
                title: title,
                statement: statement
            }
            //dispatch(asyncAddCode(formData, resetForm))
            formSubmission(formData, resetForm)
        }
        else{
            setErr(errors)
        }
        // const formData = {
        //     title: title,
        //     statement: statement
        // }
        //dispatch(asyncAddCode(formData, resetForm))
        //formSubmission(formData, resetForm)
    }

    return (
        // <div>
        //     <h2>Create the code</h2>
        //     <form onSubmit={handleSubmit}>
        //         <input style={{ margin: '3px' }} type='text' placeholder="Enter the title" value={title} onChange={(e) => { setTitle(e.target.value) }} /><br />
        //         <textarea style={{ margin: '3px' }} placeholder="Enter the problem statement" value={statement} onChange={(e) => { setStatement(e.target.value) }} /> <br />
        //         {/* <input type='submit' /> */}
        //         <Button type="submit" variant="contained" color="primary" size="small">Submit</Button>
        //         {handleCancelCode && <Button onClick={() => { handleCancelCode() }} variant="contained" size="small">Cancel</Button>}
        //     </form>
        // </div>
        <div style={{margin:'10px'}}>
            <Typography variant="h5" mb={1}>Form</Typography>
            <form onSubmit={handleSubmit}>

                <TextField label='Enter the title' variant='outlined' value={title} onChange={(e) => { setTitle(e.target.value) }} ></TextField><br />
                {err.title && <span style={{color:'red'}}>{err.title}</span>}<br />

                <TextField label='Enter the question/statement' variant='outlined' value={statement} onChange={(e) => { setStatement(e.target.value) }} ></TextField> <br />
                {err.statement && <span style={{color:'red'}}>{err.statement}</span>}<br />
                
                <Button sx={{ mr: 1 }} type="submit" variant="contained" color="primary" size="small">Submit</Button>

                {handleCancelCode && <Button onClick={() => { handleCancelCode() }} variant="contained" size="small">Cancel</Button>}

            </form>
        </div>
    )
}
export default CodesForm