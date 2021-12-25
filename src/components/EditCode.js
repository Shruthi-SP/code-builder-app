import { useDispatch } from "react-redux"
import { asyncUpdateCode } from "../actions/codesAction"
import CodesForm from "./CodesForm"

const EditCode = (props) => {
    const { code, handleEditCode, handleCancelCode } = props
    const dispatch = useDispatch()

    const formSubmission = (formData, resetForm) => {
        console.log('edit code from submit')
        dispatch(asyncUpdateCode(code, formData, resetForm))
        handleEditCode()
    }
    return (
        <>
            <CodesForm {...code} formSubmission={formSubmission} handleCancelCode={handleCancelCode} />
        </>
        
    )
}
export default EditCode