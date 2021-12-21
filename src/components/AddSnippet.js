import { useDispatch } from "react-redux"
import { asyncAddSnippet } from '../actions/codesAction'
import FormText from './FormText'

const AddSnippet = (props) => {
    const { codeId, handleFormTextToggle, handleCancelText } = props
    const dispatch = useDispatch()

    const formSubmission = (formData) => {
        dispatch(asyncAddSnippet(codeId, formData))
        handleFormTextToggle()
        console.log('addsnippet formSubmit')
    }
    return (
        <div>
            <FormText handleCancelText={handleCancelText} formSubmission={formSubmission}/>
        </div>
        
    )
}
export default AddSnippet