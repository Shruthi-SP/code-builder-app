import { useState } from "react"
import { useDispatch } from "react-redux"
import { asyncUpdateSnippet } from '../actions/codesAction'
import FromInput from "./FormInput"
import FormText from './FormText'

const EditSnippet = (props) => {
    console.log('edit snippets compt', props)
    const {codeId, snippet, handleCancelEdit} = props
    const dispatch = useDispatch()

    const [editLimit, setEditLimit] = useState('')

    const formSubmission = (formData) => {
        dispatch(asyncUpdateSnippet(codeId, snippet._id, formData))
        handleCancelEdit()
        console.log('dispatching update')
    }
    const handleSetLimit = (e) => {
        e.preventDefault()
        const formData = {
            limit: editLimit
        }
        console.log('setLimit', formData)
        formSubmission(formData)
    }
    return (
        <div>
            {snippet.group === 'texts' && <><FormText {...snippet} formSubmission={formSubmission} handleCancelEdit={handleCancelEdit} /><br /></>}

            {snippet.group === 'input' && <><FromInput {...snippet} formSubmission={formSubmission} handleCancelEdit={handleCancelEdit} /><br /></>}

            {snippet.group === 'break' && <><input type='text' value={editLimit} placeholder="Change Limit" onChange={(e)=>{setEditLimit(e.target.value)}}/><button onClick={handleSetLimit}>Set</button><button onClick={()=>{handleCancelEdit()}}>Cancel</button></>}
        </div>   
    )
}
export default EditSnippet