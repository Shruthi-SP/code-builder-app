import { useDispatch } from "react-redux"
import { asyncAddSnippet } from '../actions/codesAction'
import FormText from './FormText'
import FromInput from "./FormInput"

const AddSnippet = (props) => {
    const { length,codeId, group, handleFormTextToggle, handleCancelText, handleFormInputToggle, handleCancelInput } = props
    const dispatch = useDispatch()

    const formSubmission = (formData) => {
        dispatch(asyncAddSnippet(codeId, formData))
        group==='texts' ? handleFormTextToggle() : handleFormInputToggle()
    }
    return (
        <div>
            {group === 'texts' && <><FormText length={length} handleCancelText={handleCancelText} formSubmission={formSubmission}/><br /></>}
            {group === 'input' && <><FromInput length={length} handleCancelInput={handleCancelInput} formSubmission={formSubmission} /><br /></>}
        </div>
        
    )
}
export default AddSnippet