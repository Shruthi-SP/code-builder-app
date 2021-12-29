import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import RLDD from 'react-list-drag-and-drop/lib/RLDD'
import AddSnippet from "./AddSnippet"
import EditSnippet from './EditSnippet'
import Submit from "./tools/Submit"
import ShowCode from "./ShowCode"
import { asyncAddSnippet, asyncDeleteSnippet, asyncUpdateCode } from '../actions/codesAction'
import { arrToDd } from "./tools/helper"

const CodeSnippetForm = (props) => {
    console.log('codeSnippetsform props=', props)
    const { admin } = props

    const dispatch = useDispatch()

    const codeObj = useSelector(state => {
        console.log('useSeletor hook id and state.codes', props.match.params.id, state.codes)
        console.log('code obj=', state.codes.data.find(ele => ele._id === props.codeId))
        return state.codes.data.find(ele => ele._id === props.match.params.id)
    })
    let array = []
    if(codeObj){
        array = codeObj.snippets
    }
    // console.log('after useselector hook codeObj, snippets', codeObj, array)

    useEffect(() => {
        setArraySnippet(array)
    }, [array])
    
    const [arraySnippet, setArraySnippet] = useState(array)
    const [formTextToggle, setFormTextToggle] = useState(false)
    const [formInputToggle, setFormInputToggle] = useState(false)
    const [limit, setLimit] = useState(0)
    const [show, setShow] = useState(false)
    const [string, setString] = useState('')
    const [errors, setErrors] = useState([])
    const [snipId, setSnipId] = useState('')
    const [editToggle, setEditToggle] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleIsSubmit = () => {
        setIsSubmitted(false)
    }

    const handleRLDDChange = (newItems) => {
        const formData = {
            snippets: [...newItems]
        }
        dispatch(asyncUpdateCode(codeObj, formData))
        setArraySnippet(array)
    }

    const handlePreviewCode = (e) => {
        e.preventDefault()
        console.log(arraySnippet.length)
        setShow(!show)
    }

    //-----------------------Text-------------------------------
    const handleCreateTexts = (e) => {
        e.preventDefault()
        setFormTextToggle(true)
    }
    const handleFormTextToggle = () => {
        console.log('CodeSnip compt handleFormTextToggle')
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
    const handleFormInputToggle = () => {
        console.log('create i/p')
        setFormInputToggle(false)
        setArraySnippet(array)
    }
    const handleInputChange = (e, ele) => {
        const arr = [...arraySnippet]
        const result = arr.find(element => element._id === ele._id)
        result.value = e.target.value.trim()
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
        dispatch(asyncAddSnippet(props.codeId, { group: 'break', limit: limit + 1 }))
    }
    const handleInsertTab = (e) => {
        e.preventDefault()
        dispatch(asyncAddSnippet(props.codeId, { group: 'tab' }))
    }
    const handleInsertDoubleTab = (e) => {
        e.preventDefault()
        dispatch(asyncAddSnippet(props.codeId, { group: 'doubleTab' }))
    }
    const handleInsertSpace = (e) => {
        e.preventDefault()
        dispatch(asyncAddSnippet(props.codeId, { group: 'space' }))
    }
    const handleInsertSubmit = (e) => {
        e.preventDefault()
        dispatch(asyncAddSnippet(props.codeId, { group: 'submit' }))
    }
    //------------------------Submit Answers---------------------
    const handleSubmitAns = (e) => {
        e.preventDefault()
        console.log('Answer Submit event triggered array=', arraySnippet)
        const arr = arraySnippet.filter(ele => ele.group === 'input')
        console.log('input tags', arr.length)
        let n = arr.length
        let err = []
        let answers = []
        arr.forEach(ele => {
            answers.push({ snipId: ele._id, snipAnswer: ele.value })
            if (ele.answer !== ele.value) {
                n--
                ele.value.trim() === '' ? err.push(`Expected ${ele.answer} instead Received empty`) :
                    err.push(`Expected ${ele.answer} instead Received ${ele.value}`)
            }
        })
        console.log('input answers', answers)
        const str = `Score ${n}/${arr.length}`
        console.log('err str', err, string)
        const formData = {
            codeId: props.codeId,
            studentId: new Date().getTime(),
            answers: answers,
            score: str
        }
        axios.post('http://localhost:3044/api/answers', formData)
            .then(response => {
                console.log('post ans response=', response.data)
            })
            .catch(err => {
                console.log('catch blk', err.message)
            })
        console.log('Submitted answers to api', formData)
        setErrors(err)
        setString(str)
        setIsSubmitted(true)
    }
    //-------------------------end of submit ans-----------------------------------------
    const handleEdit = (e, ele) => {
        e.preventDefault()
        setSnipId(ele._id)
        console.log('edit event triggered', e, ele)
        setEditToggle(true)
    }
    const handleCancelEdit = () => {
        setEditToggle(false)
        setArraySnippet(array)
    }
    const handleRemove = (e, ele) => {
        e.preventDefault()
        console.log('remove event triggered')
        dispatch(asyncDeleteSnippet(props.codeId, ele._id))
        setArraySnippet(array)
    }

    const buildFor = (ele) => {
        if (ele.group === 'texts') {
            return ele.value
        } else if (ele.group === 'break') {
            return 'Line Break'
        } else if (ele.group === 'tab') {
            return 'Tab'
        } else if (ele.group === 'doubleTab') {
            return 'DoubleTab'
        } else if (ele.group === 'space') {
            return 'Space'
        } else if (ele.group === 'submit') {
            return <Submit handleSubmitAns={handleSubmitAns} />
        } else if (ele.group === 'input') {
            //return <Input ele={ele} handleInputChange={handleInputChange} />
            return <input type='text' size='2' disabled={true} />
        }
    }

    return (
        <div>
            {
                
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    {
                        admin && <div>
                            <button style={{ margin: '5px' }} onClick={handleCreateTexts}>Create Text</button>
                            <button style={{ margin: '5px' }} onClick={handleCreateInputField}>Create Input Field</button>
                            <button style={{ margin: '5px' }} onClick={handleInsertBreak}>Insert Break</button>
                            <button style={{ margin: '5px' }} onClick={handleInsertTab}>Insert Tab</button>
                            <button style={{ margin: '5px' }} onClick={handleInsertDoubleTab}>Insert Double Tab</button>
                            <button style={{ margin: '5px' }} onClick={handleInsertSpace}>Insert Space</button>
                            <button style={{ margin: '5px' }} onClick={handleInsertSubmit}>Insert Submit</button>

                            {formTextToggle && <AddSnippet codeId={props.codeId} group={'texts'} handleFormTextToggle={handleFormTextToggle} handleCancelText={handleCancelText} />}
                            {formInputToggle && <AddSnippet codeId={props.codeId} group={'input'} handleFormInputToggle={handleFormInputToggle} handleCancelInput={handleCancelInput} />}
                            <div style={{ margin: '5px' }}>
                                <h4>Re-arrange the snippets</h4>
                                <ol>
                                    <RLDD
                                        items={arrToDd(arraySnippet)}
                                        itemRenderer={(item) => {
                                            return (
                                                <li>
                                                    <code>{buildFor(item)}
                                                        {/* {
                                                    editToggle && snipId === item._id ?
                                                        (<EditSnippet codeId={props.codeId} snippet={item} handleCancelEdit={handleCancelEdit}
                                                        />) : (<>
                                                            {
                                                                (item.group === 'texts' || item.group === 'input' || item.group === 'break') && <button style={{ margin: '2px' }} onClick={(e) => { handleEdit(e, item) }}>edit</button>
                                                            }

                                                        </>)
                                                }
                                                <button style={{ margin: '2px' }} onClick={(e) => { handleRemove(e, item) }}>remove</button><br /> */}
                                                    </code>
                                                </li>
                                            );
                                        }}
                                        onChange={handleRLDDChange}
                                    />
                                </ol>
                            </div>
                            <div style={{ margin: '5px' }}>
                                <h4>Building</h4>
                                <ol>
                                    {
                                        arraySnippet.length > 0 && arraySnippet.map((ele, i) => {
                                            return <li key={i}>
                                                <code>{buildFor(ele)}
                                                    {
                                                        editToggle && snipId === ele._id ?
                                                            (<EditSnippet codeId={props.codeId} snippet={ele} handleCancelEdit={handleCancelEdit}
                                                            />) : (<>
                                                                {
                                                                    (ele.group === 'texts' || ele.group === 'input' || ele.group === 'break') && <button style={{ margin: '2px' }} onClick={(e) => { handleEdit(e, ele) }}>edit</button>
                                                                }
                                                            </>)
                                                    }
                                                    <button style={{ margin: '2px' }} onClick={(e) => { handleRemove(e, ele) }}>remove</button><br />
                                                </code>
                                            </li>
                                        })
                                    }
                                </ol>
                                <button onClick={() => { props.handleEditSnippets() }}>Back to Snippet</button>
                            </div>
                        </div>
                    }
                    <div style={{ marginTop: '60px' }}>
                        <ShowCode isSubmitted={isSubmitted} handleIsSubmit={handleIsSubmit} codeId={props.codeId} handleSubmitAns={handleSubmitAns} errors={errors} string={string} handleInputChange={handleInputChange} handlePreviewCode={handlePreviewCode} />
                    </div>
                </div>
            }
        </div>
    )
}
export default CodeSnippetForm