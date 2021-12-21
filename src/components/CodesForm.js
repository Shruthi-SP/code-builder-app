import { useState } from "react"
import { useDispatch } from "react-redux"
import { asyncAddCode } from "../actions/codesAction"

const CodesForm =(props) => {
    console.log('form props=', props, props.history)

    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [statement, setStatement] = useState('')

    const resetForm = () => {
        setStatement('')
        setTitle('')
    }

    // const redirect = (id) => {
    //     console.log('redirecting from cmpt')
    //     props.history.push(`/code-snippet/${id}`)
    // }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            title: title,
            statement: statement
        }
        dispatch(asyncAddCode(formData, resetForm))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder="Enter the title" value={title} onChange={(e)=>{setTitle(e.target.value)}}/><br />

                <input type='text' placeholder="Enter the problem statement" value={statement} onChange={(e)=>{setStatement(e.target.value)}} /> <br />
                
                <input type='submit' />
            </form>
        </div>
    )
}
export default CodesForm