import { useDispatch } from "react-redux"
import { asyncUpdateSnippet } from '../actions/codesAction'
import FormText from './FormText'

const EditSnippet = (props) => {
    console.log('edit snippets compt', props)
    const {codeId, snippet, handleEditToggle, handleCancelText } = props
    const dispatch = useDispatch()

    const formSubmission = (formData) => {
        dispatch(asyncUpdateSnippet(codeId, snippet._id, formData))
        handleEditToggle()
        console.log('dispatching update')
    }
    return (
        <div>
            <FormText {...snippet} handleCancelText={handleCancelText} formSubmission={formSubmission}/>
        </div>   
    )
}
export default EditSnippet