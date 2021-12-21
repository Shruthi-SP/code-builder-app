import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import FromInput from "./FormInput"
import AddSnippet from "./AddSnippet"
import EditSnippet from './EditSnippet'
import Input from "./tools/Input"
import Submit from "./tools/Submit"
//import ShowCode from "./ShowCode"
import { asyncAddSnippet, asyncUpdateSnippet } from '../actions/codesAction'

const CodeSnippetForm = (props) => {
    console.log('codeSnippetsform props=', props)
    const dispatch = useDispatch()

    const array = useSelector(state=>{
        console.log('useSelector', state.codes)
        const obj = state.codes.find(ele=>ele._id==props.codeId)
        console.log('uselector snippets',obj.snippets)
        return obj.snippets
    })

    useEffect(()=>{
        setArraySnippet(array)
    }, [array])

    const [arraySnippet, setArraySnippet] = useState([array])
    const [formTextToggle, setFormTextToggle] = useState(false)
    const [formInputToggle, setFormInputToggle] = useState(false)
    const [limit, setLimit] = useState(0)
    const [show, setShow] = useState(false)
    const [string, setString] = useState('')
    const [errors, setErrors] = useState([])
    const [snipId, setSnipId] = useState('')
    const [editToggle, setEditToggle] = useState(false)
    const [remove, setRemove] = useState(false)

    // const handleCreateCode = (e) => {
    //     e.preventDefault()
    //     console.log(arraySnippet.length)
    //     setShow(true)
    // }
    //-----------------------Text-------------------------------
    const handleCreateTexts = (e) => {
        e.preventDefault()
        setFormTextToggle(true)
    }
    const handleFormTextToggle = () => {
        console.log('CodeSnip compt handleFormTextToggle obj = ')
        setFormTextToggle(false)
        setArraySnippet(array)
    }
    const handleCancelText = () => {
        setFormTextToggle(false)
        setEditToggle(false)
    }
    //-----------------------End of Text----------------------------
    //-----------------------Input----------------------------------
    const handleCreateInputField = (e) => {
        e.preventDefault()
        setFormInputToggle(true)
    }
    const handleFormInputToggle = (ele) => {
        console.log('create i/p newArr = ', [...arraySnippet, ele])
        setArraySnippet([...arraySnippet, ele])
        setFormInputToggle(false)
    }
    const handleInputChange = (e, ele) => {
        const arr = [...arraySnippet]
        const result = arr.find(element => element._id === ele._id)
        result.value = e.target.value
        console.log('handleInputChange', arr)
        setArraySnippet(arr)
    }
    const handleCancelInput = () => {
        setFormInputToggle(false)
    }
    //--------------------end of input----------------------------------
    const handleInsertBreak = (e) => {
        e.preventDefault()
        setLimit(limit + 1)
        setArraySnippet([...arraySnippet, { group: 'break', limit: limit + 1 }])
    }
    const handleInsertTab = (e) => {
        e.preventDefault()
        setArraySnippet([...arraySnippet, { group: 'tab' }])
    }
    const handleInsertSpace = (e) => {
        e.preventDefault()
        setArraySnippet([...arraySnippet, { group: 'space' }])
    }
    const handleInsertSubmit = (e) => {
        e.preventDefault()
        setArraySnippet([...arraySnippet, { group: 'submit' }])
    }
    //------------------------Submit Answers---------------------
    const handleSubmitAns = (e) => {
        e.preventDefault()
        console.log('Answer Submit event triggered array=', arraySnippet)
        const arr = arraySnippet.filter(ele => ele.group === 'input')
        console.log('input tags', arr.length)
        let n = arr.length
        let err = []
        arr.forEach(ele => {
            if (ele.answer !== ele.value) {
                n--
                err.push(`Expected ${ele.answer} instead Received ${ele.value}`)
            }
        })
        const str = `Score ${n}/${arr.length}`
        console.log('err str', err, string)
        setErrors(err)
        setString(str)
    }
//-------------------------end of submit ans-----------------------------------------
    const handleEdit = (e, ele) => {
        e.preventDefault()
        setSnipId(ele._id)
        console.log('edit event triggered', e, ele)
        setEditToggle(true)
        //dispatch(asyncUpdateSnippet(props.codeId, ele._id, formData ))
        //setArraySnippet(array)
    }
    const handleEditToggle = () => {
        setEditToggle(false)
        setArraySnippet(array)
    }
    const handleRemove = (e, ele) => {
        e.preventDefault()
        console.log('remove event triggered')
    }

    const buildFor = (ele) => {
        if (ele.group === 'texts') {
            return ele.value
        } else if (ele.group === 'break') {
            return 'Line Break'
        } else if (ele.group === 'tab') {
            return 'Tab'
        } else if (ele.group === 'space') {
            return 'Space'
        } else if (ele.group === 'submit') {
            return <Submit handleSubmitAns={handleSubmitAns} />
        } else if (ele.group === 'input') {
            return <Input ele={ele} handleInputChange={handleInputChange} />
        }
    }

    return (
        <div>
            
            {
                // show ? <ShowCode array={array} buildFor={buildFor} handleSubmitAns={handleSubmitAns} errors={ errors} string={string}/> : 
                <div>
                    <form>
                        <button style={{ margin: '5px' }} onClick={handleCreateTexts}>Create Text</button>
                        <button style={{ margin: '5px' }} onClick={handleCreateInputField}>Create Input Field</button>
                        <button style={{ margin: '5px' }} onClick={handleInsertBreak}>Insert Break</button>
                        <button style={{ margin: '5px' }} onClick={handleInsertTab}>Insert Tab</button>
                        <button style={{ margin: '5px' }} onClick={handleInsertSpace}>Insert Space</button>
                        <button style={{ margin: '5px' }} onClick={handleInsertSubmit}>Insert Submit</button>
                    </form>

                    {formTextToggle && <AddSnippet codeId={props.codeId} handleFormTextToggle={handleFormTextToggle} handleCancelText={handleCancelText} />}
                    {formInputToggle && <FromInput handleFormInputToggle={handleFormInputToggle} handleCancelInput={handleCancelInput} />}

                    <div style={{ margin: '5px' }}>
                        <h4>Building</h4>
                        {/* <form onSubmit={handleCreateCode}> */}
                            {
                                arraySnippet.length > 0 && arraySnippet.map((ele, i) => {
                                    return <code key={i}>{buildFor(ele)}
                                        {editToggle && snipId === ele._id ? <EditSnippet codeId={props.codeId} snippet={ele} handleEditToggle={handleEditToggle} handleCancelText={handleCancelText}/> : <button style={{margin:'2px'}} onClick={(e)=>{handleEdit(e, ele)}}>edit</button>}
                                        
                                        <button style={{margin:'2px'}} onClick={(e)=>{handleRemove(e, ele)}}>remove</button><br />
                                    </code>
                                })
                            }
                            {/* <br /><input type='submit' value='Create Code' /> */}
                        {/* </form> */}
                    </div>
                </div>
            }
        </div>
    )
}
export default CodeSnippetForm