import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import RLDD from 'react-list-drag-and-drop/lib/RLDD'
import AddSnippet from "./AddSnippet"
//import EditSnippet from './EditSnippet'
import Submit from "./tools/Submit"
import ShowCode from "./ShowCode"
import { asyncAddSnippet, asyncDeleteSnippet, asyncUpdateCode } from '../actions/codesAction'
import { arrToDd } from "./tools/helper"
import ModalForm from "./ModalForm"
import { Button, IconButton, Grid, Typography } from "@mui/material"
import { Delete, Edit, ArrowBackIos } from "@mui/icons-material"
import ErrorBoundary from "./ErrorBoundary"

const CodeSnippetForm = (props) => {

    const dispatch = useDispatch()

    const isLoaded = useSelector(state => {
        //console.log(state.codes.isLoading)
        return state.codes.isLoading
    })

    const codeObj = useSelector(state => {
        return state.codes.data.find(ele => ele._id === props.match.params.id)
    })
    const user = useSelector(state => {
        return state.user
    })
    const admin = user.role === 'admin' ? true : false

    let array = []
    if (codeObj) {
        array = codeObj.snippets
    }
    else throw new Error('I CodeSnippetForm crashed! No code');

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
        setArraySnippet([...newItems])
    }

    const handlePreviewCode = (e) => {
        e.preventDefault()
        setShow(!show)
    }

    //-----------------------Text-------------------------------
    const handleCreateTexts = (e) => {
        e.preventDefault()
        setFormTextToggle(true)
        setOpen(true)
    }
    const handleFormTextToggle = () => {
        setFormTextToggle(false)
        setArraySnippet(array)
        setOpen(false)
    }
    const handleCancelText = () => {
        setFormTextToggle(false)
        setEditToggle(false)
        setOpen(false)
    }
    //-----------------------End of Text----------------------------
    //-----------------------Input----------------------------------
    const handleCreateInputField = (e) => {
        e.preventDefault()
        setFormInputToggle(true)
    }
    const handleFormInputToggle = () => {
        setFormInputToggle(false)
        setArraySnippet(array)
    }
    const handleInputChange = (e, ele) => {
        const arr = [...arraySnippet]
        const result = arr.find(element => element._id === ele._id)
        result.value = e.target.value.trim()
        setArraySnippet(arr)
    }
    const handleInputBlur = (e, ele) => {
        const arr = [...arraySnippet]
        const result = arr.find(element => element._id === ele._id)
        result.isDisable = true
        setArraySnippet(arr)
    }
    const handleCancelInput = () => {
        setFormInputToggle(false)
    }
    //--------------------end of input----------------------------------
    const handleInsertBreak = (e) => {
        e.preventDefault()
        setLimit(limit + 1)
        dispatch(asyncAddSnippet(props.codeId, { group: 'break', limit: limit + 1, id:arraySnippet.length },))
    }
    const handleInsertTab = (e) => {
        e.preventDefault()
        dispatch(asyncAddSnippet(props.codeId, { group: 'tab', id:arraySnippet.length }))
    }
    const handleInsertDoubleTab = (e) => {
        e.preventDefault()
        dispatch(asyncAddSnippet(props.codeId, { group: 'doubleTab', id:arraySnippet.length }))
    }
    const handleInsertSpace = (e) => {
        e.preventDefault()
        dispatch(asyncAddSnippet(props.codeId, { group: 'space', id:arraySnippet.length }))
    }
    const handleInsertSubmit = (e) => {
        e.preventDefault()
        dispatch(asyncAddSnippet(props.codeId, { group: 'submit', id:arraySnippet.length }))
    }
    //------------------------Submit Answers---------------------
    const handleSubmitAns = (e) => {
        e.preventDefault()
        const arr = arraySnippet.filter(ele => ele.group === 'input')
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
        const str = `Score ${n}/${arr.length}`
        const formData = {
            codeId: props.codeId,
            studentId: user.id,
            answers: answers,
            score: str
        }
        if (user.role === 'student') {
            axios.post('http://localhost:3044/api/answers', formData)
                .then(response => {
                    alert('submitted successfully')
                })
                .catch(err => {
                    alert('catch blk', err.message)
                })
        }

        setErrors(err)
        setString(str)
        setIsSubmitted(true)
    }
    //-------------------------end of submit ans-----------------------------------------
    const handleEdit = (e, ele) => {
        e.preventDefault()
        setSnipId(ele._id)
        setSnip(ele)
        setEditToggle(true)
        handleClickOpen()
    }
    const handleCancelEdit = () => {
        setEditToggle(false)
        setArraySnippet(array)
    }
    const handleRemove = (e, ele) => {
        e.preventDefault()
        dispatch(asyncDeleteSnippet(props.codeId, ele._id))
        setArraySnippet(array)
    }

    const buttons = [
        <Button variant="contained" color="secondary" size="small" sx={{ borderRadius: 10, m: 1 }} onClick={handleCreateTexts}>Insert Text</Button>,
        <Button variant="contained" color="secondary" size="small" sx={{ borderRadius: 10, m: 1 }} onClick={handleCreateInputField}>Insert Input Field</Button>,
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
                !isLoaded ? <div><h2>CodeSnippetForm crashed! Code not loaded</h2></div> :
                    <Grid container>
                        {admin && <Grid item xs={4}>
                            {editToggle && <ModalForm open={open} length={arraySnippet.length} codeId={props.codeId} snippet={snip} handleCancelEdit={handleCancelEdit} handleClose={handleClose}
                            />}
                            <div>
                                <Typography variant="h6">Re-arrange the snippets</Typography>
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
                                                                }
                                                            </>)
                                                        }
                                                        <IconButton variant="outlined" color="error" size="small" onClick={(e) => { handleRemove(e, item) }}><Delete /></IconButton>
                                                    </code>
                                                </li>
                                            );
                                        }}
                                        onChange={handleRLDDChange}
                                    />
                                </ol>
                            </div>

                            {formTextToggle && <AddSnippet length={arraySnippet.length} codeId={props.codeId} group={'texts'} handleFormTextToggle={handleFormTextToggle} handleCancelText={handleCancelText}  />}
                            {formInputToggle && <AddSnippet length={arraySnippet.length} codeId={props.codeId} group={'input'} handleFormInputToggle={handleFormInputToggle} handleCancelInput={handleCancelInput} />}

                            <Grid container >
                                {buttons.map((ele, i) => {
                                    return <Grid key={i} item xs={12} sm={6}>{ele}</Grid>
                                })}
                            </Grid>
                            <Button variant="contained" startIcon={<ArrowBackIos />} size="small" onClick={() => { props.handleEditSnippets() }}>Back</Button>
                        </Grid>
                        }
                        {Object.keys(codeObj).length > 0 && <Grid item xs={8}>
                            <ErrorBoundary><ShowCode admin={admin} isSubmitted={isSubmitted} codeObj={codeObj} handleIsSubmit={handleIsSubmit} codeId={props.codeId} handleSubmitAns={handleSubmitAns} errors={errors} string={string} handleInputChange={handleInputChange} handleInputBlur={handleInputBlur} handlePreviewCode={handlePreviewCode} /></ErrorBoundary>
                        </Grid>}
                    </Grid>
            }
        </>
    )
}
export default CodeSnippetForm