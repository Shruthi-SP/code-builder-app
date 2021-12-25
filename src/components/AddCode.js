import CodesForm from './CodesForm'
import { useDispatch } from 'react-redux'
import { asyncAddCode } from '../actions/codesAction'
import { useEffect } from 'react'

const AddCode = (props) => {

    useEffect(()=>{
        props.handleCancelShow()
        props.handleCancelPreview()
    })

    const dispatch = useDispatch()

    // const redirect = () => {
    //     console.log('redirecting from code snippets to codes list')
    //     props.history.push('/codes')
    // }
    const redirect = (id) => {
        //props.handleShow()
        console.log('redirection id', id)
        console.log('redirecting from cmpt')
        props.history.push(`/codes/${id}`)
    }

    const formSubmission = (formData, resetForm) => {
        console.log('add code form submit')
        dispatch(asyncAddCode(formData, resetForm, redirect))
    }

    return (
        <div>
            <CodesForm formSubmission={formSubmission} />
        </div>
    )
}
export default AddCode