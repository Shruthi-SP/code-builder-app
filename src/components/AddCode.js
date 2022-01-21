import CodesForm from './CodesForm'
import { useDispatch } from 'react-redux'
import { asyncAddCode } from '../actions/codesAction'
import { useEffect } from 'react'

const AddCode = (props) => {

    useEffect(()=>{
        props.handleCancelShow()
    }, [])

    const dispatch = useDispatch()

    const redirect = (id) => {
        props.handleShow()
        props.history.push(`/codes/${id}`)
    }

    const formSubmission = (formData, resetForm) => {
        dispatch(asyncAddCode(formData, resetForm, redirect))
    }

    return (
        <div>
            <CodesForm formSubmission={formSubmission} />
        </div>
    )
}
export default AddCode