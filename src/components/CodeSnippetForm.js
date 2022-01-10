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
import ModalForm from "./ModalForm"
import { Button, IconButton, ButtonGroup, Grid, Paper } from "@mui/material"
import { Delete, Edit } from "@mui/icons-material"

const CodeSnippetForm = (props) => {
    console.log('codeSnippetsform props=', props)
    const { admin, codeObj } = props

    const dispatch = useDispatch()

    // const codeObj = useSelector(state => {
    //     return state.codes.data.find(ele => ele._id === props.match.params.id)
    // })

    let array = []
    if (codeObj) {
        array = codeObj.snippets
    }
    // console.log('after useselector hook codeObj, snippets', codeObj, array)

    useEffect(() => {
        setArraySnippet(array)
    }, [codeObj])
    useEffect(() => {
        setArraySnippet(array)
    }, [])

    const [arraySnippet, setArraySnippet] = useState(array)
    const [formTextToggle, setFormTextToggle] = useState(false)
    const [formInputToggle, setFormInputToggle] = useState(false)
    const [limit, setLimit] = useState(0)
    const [show, setShow] = useState(false)
    const [string, setString] = useState('')
    const [errors, setErrors] = useState([])
    const [snipId, setSnipId] = useState('')
    const [snip, setSnip] = useState({})
    const [editToggle, setEditToggle] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        handleCancelEdit()
    };

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

    //-----------------------Text-------------------------------
    const handleInsertTexts = (e) => {
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
    const handleInsertInputField = (e) => {
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
    const handleInputBlur = (e, ele) => {
        const arr = [...arraySnippet]
        const result = arr.find(element => element._id === ele._id)
        result.isDisable = true
        setArraySnippet(arr)
        console.log('handleInputBlur', arr)
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
        setSnip(ele)
        console.log('edit event triggered', e, ele)
        setEditToggle(true)
        handleClickOpen()
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

    const buttons = [
        <Button variant="contained" color="secondary" size="small" sx={{ borderRadius: 10, m: 1 }} onClick={handleInsertTexts}>Insert Text</Button>,
        <Button variant="contained" color="secondary" size="small" sx={{ borderRadius: 10, m: 1 }} onClick={handleInsertInputField}>Insert Input-Field</Button>,
        <Button variant="contained" color="secondary" size="small" sx={{ borderRadius: 10, m: 1 }} onClick={handleInsertTab}>Insert Tab</Button>,
        <Button variant="contained" color="secondary" size="small" sx={{ borderRadius: 10, m: 1 }} onClick={handleInsertDoubleTab}>Insert Double Tab</Button>,
        <Button variant="contained" color="secondary" size="small" sx={{ borderRadius: 10, m: 1 }} onClick={handleInsertBreak}>Insert Break</Button>,
        <Button variant="contained" color="secondary" size="small" sx={{ borderRadius: 10, m: 1 }} onClick={handleInsertSpace}>Insert Space</Button>,
        <Button variant="contained" color="secondary" size="small" sx={{ borderRadius: 10, m: 1 }} onClick={handleInsertSubmit}>Insert Submit</Button>,
    ]

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
        <>
            {
                <Grid container>
                    {admin &&
                        <Grid item xs={4}>
                            {editToggle && <ModalForm open={open} codeId={props.codeId} snippet={snip} handleCancelEdit={handleCancelEdit} handleClose={handleClose}
                            />}

                            <div style={{ margin: '5px' }}>
                                <h4>Re-arrange the snippets</h4>
                                <ol>
                                    <RLDD
                                        items={arrToDd(arraySnippet)}
                                        itemRenderer={(item) => {
                                            return (
                                                <li>
                                                    <code>{buildFor(item)}
                                                        {
                                                            (<>
                                                                {
                                                                    (item.group === 'texts' || item.group === 'input' || item.group === 'break') && <IconButton variant="outlined" color="primary" size="small" onClick={(e) => { handleEdit(e, item) }}>
                                                                        <Edit />
                                                                    </IconButton>
                                                                    // <button style={{ margin: '2px' }} onClick={(e) => { handleEdit(e, item) }}>edit</button>
                                                                }

                                                            </>)
                                                        }
                                                        <IconButton variant="outlined" color="error" size="small" onClick={(e) => { handleRemove(e, item) }}><Delete /></IconButton>
                                                        {/* <button style={{ margin: '2px' }} onClick={(e) => { handleRemove(e, item) }}>remove</button><br /> */}
                                                    </code>
                                                </li>
                                            );
                                        }}
                                        onChange={handleRLDDChange}
                                    />
                                </ol>
                            </div>

                            {formTextToggle && <AddSnippet codeId={props.codeId} group={'texts'} handleFormTextToggle={handleFormTextToggle} handleCancelText={handleCancelText} />}
                            {formInputToggle && <AddSnippet codeId={props.codeId} group={'input'} handleFormInputToggle={handleFormInputToggle} handleCancelInput={handleCancelInput} />}
                            <Grid container >
                                {buttons.map((ele, i) => {
                                    return <Grid key={i} item xs={12} sm={6}>{ele}</Grid>
                                })}
                            </Grid>
                            <button onClick={() => { props.handleEditSnippets() }}>Back</button>
                        </Grid>
                    }
                    {Object.keys(codeObj).length > 0 && <Grid item xs={8}>
                        <ShowCode admin={admin} isSubmitted={isSubmitted} codeObj={codeObj} handleIsSubmit={handleIsSubmit} codeId={props.codeId} handleSubmitAns={handleSubmitAns} errors={errors} string={string} handleInputChange={handleInputChange} handleInputBlur={handleInputBlur} />
                    </Grid>}
                </Grid>
            }
        </>
    )
}
export default CodeSnippetForm