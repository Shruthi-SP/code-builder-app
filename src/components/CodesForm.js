import { useState } from "react"
import Button from '@mui/material/Button';

const CodesForm =(props) => {
    console.log('form props=', props, props.history)
    const { title:editTitle, statement:editStatement, formSubmission, handleCancelCode } = props

    const [title, setTitle] = useState(editTitle ? editTitle : '')
    const [statement, setStatement] = useState(editStatement ? editStatement : '')

    const resetForm = () => {
        setStatement('')
        setTitle('')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            title: title,
            statement: statement
        }
        //dispatch(asyncAddCode(formData, resetForm))
        formSubmission(formData, resetForm)
    }

    return (
        <div>
            <h2>Create the code</h2>
            <form onSubmit={handleSubmit}>
                <input style={{margin:'3px'}} type='text' placeholder="Enter the title" value={title} onChange={(e)=>{setTitle(e.target.value)}}/><br />
                <textarea style={{margin:'3px'}} placeholder="Enter the problem statement" value={statement} onChange={(e)=>{setStatement(e.target.value)}} /> <br />
                <input type='submit' />
                {/* {handleCancelCode && <button onClick={()=>{handleCancelCode()}}>Cancel</button>} */}
                {handleCancelCode && <Button onClick={()=>{handleCancelCode()}} variant="contained">Cancel</Button>}
            </form>
        </div>
    )
}
export default CodesForm