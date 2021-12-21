import { useState } from "react"

const FormText = (props) => {
    console.log('formtxt props', props)
    const { handleCancelText ,formSubmission, value:editTxt, hint:editHint} = props
    
    const [txt, setTxt] = useState(editTxt ? editTxt : '')
    const [hint, setHint] = useState(editHint ? editHint : '')

    const handleSubmit = (e) => {
        e.preventDefault()
        const obj = {
            group: 'texts',
            value: txt,
            hint: hint
        }
        console.log('obj=', obj)
        formSubmission(obj)
    }

    return <form onSubmit={handleSubmit} >
        <input style={{margin:'5px'}} type='text' value={txt} placeholder="enter texts" onChange={(e)=>{setTxt(e.target.value)}} />
        <input style={{margin:'5px'}} type='text' value={hint} placeholder="enter hint" onChange={(e)=>{setHint(e.target.value)}} />
        <input style={{margin:'5px'}} type='submit' /><button onClick={()=>{handleCancelText()}}>Cancel</button>
    </form>
}
export default FormText