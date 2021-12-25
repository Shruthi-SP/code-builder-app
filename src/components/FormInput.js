import { useState } from "react"

const FromInput = (props) => {
    console.log('formInput props=', props)
    const {handleCancelInput, handleCancelEdit, formSubmission, answer:editAns, hint:editHint} = props
    const [ans, setAns] = useState(editAns ? editAns : '')
    const [hint, setHint] = useState(editHint ? editHint : '')
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const obj = {
            value: '',
            group: 'input',
            hint: hint,
            type: 'input',
            answer: ans
        }
        console.log('obj=', obj)
        formSubmission(obj)
    }

    return <form onSubmit={handleSubmit} >
        <input style={{margin:'5px'}} type='text' value={ans} placeholder="enter answer here" onChange={(e) => { setAns(e.target.value) }} />
        <input style={{margin:'5px'}} type='text' value={hint} placeholder="enter hint here" onChange={(e) => { setHint(e.target.value) }} />
        <input style={{margin:'5px'}} type='submit' />
        {
            editAns ? <button onClick={()=>{handleCancelEdit()}}>Cancel</button> : <button onClick={()=>{handleCancelInput()}}>Cancel</button>
        }
    </form>
}
export default FromInput