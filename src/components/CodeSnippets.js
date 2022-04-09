import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import CodeSnippetForm from "./CodeSnippetForm"
import { buildFor } from "./tools/helper"
import { asyncDeleteCode, asyncGetCode } from "../actions/codesAction"
import EditCode from "./EditCode"
import { Button, ButtonGroup, Typography, Grid } from "@mui/material"
import { Delete, Edit, Add } from "@mui/icons-material"
import ErrorBoundary from "./ErrorBoundary"
import axios from "axios"
import CodeSolution from "./CodeSolution"
import Input from "./tools/Input"
import Break from "./tools/Break"
import Space from "./tools/Space"
import Submit from "./tools/Submit"
import Tab from "./tools/Tab"
import Explanations from "./Explanations"
import Hint from "./Hints"
import { withRouter } from "react-router-dom"
import Swal from 'sweetalert2'

const CodeSnippets = (props) => {
    const user = useSelector(state=>{
        return state.user
    })
    const admin = user.role === 'admin' ? true : false
    //console.log('cs admin', admin)
    const _id = props.match.params.id

    const [codeToggle, setCodeToggle] = useState(false)
    const [snippetToggle, setSnippetToggle] = useState(false)
    const [obj, setObj] = useState({})
    const [arraySnippet, setArraySnippet] = useState([])
    const [solution, setSolution] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [string, setString] = useState('')
    const [errors, setErrors] = useState([])
    const [hints, setHints] = useState([])
    const [explanations, setExplanations] = useState([])
    const [start, setStart] = useState(true)
    const [prev, setPrev] = useState(false)
    const [nxt, setNxt] = useState(false)
    const [count, setCount] = useState(0)
    const [studHints, setStudHints] = useState([])
    const [preview, setPreview] = useState(false)

    const handlePreview = (e) => {
        setPreview(!preview)
    }

    const getResult = (object) => {
        if (Object.keys(object).length > 0) {
            setObj(object)
            let cs = JSON.parse(localStorage.getItem(_id))
            if (cs && cs.length > 0) {
                setArraySnippet(cs)
            } else {
                setArraySnippet(object.snippets)
            }
            const h = getHints(object.snippets)
            setHints(h)
            const ex = getExplanations(object.snippets)
            setExplanations(ex)
        }
        else throw new Error('Code Snippets crashed, couldnt get the obj')
    }
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(asyncGetCode(_id, getResult))
    }, [codeToggle])

    useEffect(() => {
        return () => {
            if (localStorage.user_inputs) {
                localStorage.setItem(_id, localStorage.user_inputs)
                localStorage.removeItem('user_inputs')
            }
        }
    }, [])

    window.onload = (e) => {
        if (localStorage.user_inputs) {
            setArraySnippet(JSON.parse(localStorage.getItem('user_inputs')))
        }
    }

    let userInput = []
    if (JSON.parse(localStorage.getItem('user_inputs'))) {
        userInput = [...(JSON.parse(localStorage.getItem('user_inputs')))]
    }
    else {
        userInput = []
    }

    const handleInputChange = (e, ele) => {
        const arr = [...arraySnippet]
        const result = arr.find(element => element._id === ele._id)
        result.value = e.target.value.trim()
        localStorage.setItem('user_inputs', JSON.stringify(arr))
        setArraySnippet(arr)
    }
    const handleInputBlur = (e, ele) => {
        const arr = [...arraySnippet]
        const result = arr.find(element => element._id === ele._id)
        result.isDisable = true
        localStorage.setItem('user_inputs', JSON.stringify(arr))
        setArraySnippet(arr)
    }
    const handleIsSubmit = () => {
        setIsSubmitted(false)
    }
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
        const studentId = JSON.parse(localStorage.getItem('user')).id
        const str = `Score ${n}/${arr.length}`
        const formData = {
            codeId: _id,
            studentId: studentId,
            answers: answers,
            score: str
        }
        if (!admin) {
            axios.post('http://localhost:3044/api/answers', formData)
                .then(response => {
                    if (response.hasOwnProperty('errors')) {
                        //alert(errors.message)
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: response.errors,
                            footer: ''
                        })
                    }
                    else {
                        //alert('answer submitted')
                        Swal.fire({
                            icon: 'success',
                            title: 'Submitted',
                            text: 'answer submitted',
                            footer: ''
                        })
                    }

                })
                .catch(err => {
                    //alert(err.message)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: err.message,
                        footer: ''
                    })
                })
        }
        setErrors(err)
        setString(str)
        setIsSubmitted(true)
        //localStorage.removeItem('user_inputs')
        localStorage.removeItem(_id)
    }
    const handleStart = (e) => {
        e.preventDefault()
        setStart(!start)
        setPrev(true)
        const a = obj.snippets.find(ele => ele.group === 'input')
        const index = obj.snippets.findIndex(ele => ele.group === 'input')
        const h = getHints(obj.snippets.slice(0, index + 1))
        setStudHints(h)
        setCount(index + 1)
    }

    const handleNext = (e) => {
        e.preventDefault()
        setPrev(false)
        if (count < obj.snippets.length) {
            const a = obj.snippets.slice(count).find(ele => ele.group === 'input')
            if (a) {
                const index = Number(a.id) + 1
                const h = getHints(obj.snippets.slice(0, index))
                //console.log('next',index, a, obj.snippets, count)
                setStudHints(h)
                setCount(index)
            } else {
                setCount(obj.snippets.length)
                const h = getHints(obj.snippets)
                setStudHints(h)
                setNxt(true)
            }
        }
    }
    const handlePrevious = (e) => {
        e.preventDefault()
        setNxt(false)
        const arr = [...obj.snippets].reverse()
        if (count > 0) {
            const a = arr.slice((arr.length) - (count - 1)).find(ele => ele.group === 'input')
            if (a) {
                let index = a.id + 1
                const h = getHints(obj.snippets.slice(0, index))
                //console.log('prev',h, index, a)
                setStudHints(h)
                setCount(index)
            } else {
                setCount(count)
                setPrev(true)
            }

        }
    }

    const handleSolution = () => {
        handleIsSubmit()
        setSolution(!solution)
    }

    const redirect = () => {
        props.history.push('/codes')
    }

    const handleEditSnippets = () => {
        setSnippetToggle(!snippetToggle)
    }
    const handleEditCode = (e) => {
        setCodeToggle(!codeToggle)
    }
    const handleCancelCode = () => {
        setCodeToggle(false)
    }
    const handleRemoveCode = (e) => {
        dispatch(asyncDeleteCode(_id, redirect))
    }
    const getHints = (a) => {
        const ar = []
        a.forEach(ele => {
            if (ele.hasOwnProperty('hints')) {
                if (ele.hints.length > 0) {
                    for (let i = 0; i < ele.hints.length; i++) {
                        ar.push(ele.hints[i].hint)
                    }
                }
            }
        })
        return ar
    }
    const getExplanations = (a) => {
        const ar = []
        a.forEach(ele => {
            if (ele.hasOwnProperty('explanation')) {
                if (ele.explanation !== '') {
                    ar.push(ele.explanation)
                }
            }
        })
        return ar
    }
    const buildForStudent = (ele) => {
        if (ele.group === 'texts') {
            return ele.value
        } else if (ele.group === 'break') {
            return <Break />
        } else if (ele.group === 'tab') {
            return <Tab />
        } else if (ele.group === 'doubleTab') {
            return <><Tab /><Tab /></>
        } else if (ele.group === 'space') {
            return <Space />
        } else if (ele.group === 'submit') {
            return <Submit />
        } else if (ele.group === 'input') {
            return <Input ele={ele} isSubmitted={isSubmitted} handleInputChange={handleInputChange} handleInputBlur={handleInputBlur} />
        }
    }
    const buildForSolution = (ele) => {
        if (ele.group === 'texts') {
            return ele.value
        } else if (ele.group === 'break') {
            return <Break />
        } else if (ele.group === 'tab') {
            return <Tab />
        } else if (ele.group === 'doubleTab') {
            return <><Tab /><Tab /></>
        } else if (ele.group === 'space') {
            return <Space />
        } else if (ele.group === 'submit') {
            return <Submit />
        } else if (ele.group === 'input') {
            return ele.answer
        }
    }

    return (
        <div>
            {
                (admin && Object.keys(obj).length > 0) && <div style={{ margin: '5px' }}>
                    <h3>Admin view</h3>
                    <Typography variant="h5" color="primary.dark">Code and Snippets</Typography>
                    {snippetToggle ? <>                        
                            <h3>Admin create snippet form</h3>
                            <ErrorBoundary><CodeSnippetForm admin={admin} codeId={_id} {...props} obj={obj} handleEditSnippets={handleEditSnippets} /></ErrorBoundary>
                        </>
                        : <div>
                            {
                                codeToggle ? <EditCode code={obj} handleEditCode={handleEditCode} handleCancelCode={handleCancelCode} /> : <>
                                    <code><b>Title: {obj.title}</b><br /></code>
                                    <code><b>Statement: {obj.statement}</b></code><br />
                                </>
                            }
                            {
                                arraySnippet.length > 0 && arraySnippet.map((ele, i) => {
                                    return <code key={i}>
                                        {buildFor(ele)}
                                    </code>
                                })
                            }
                            <br /><br />
                            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                <Button sx={{ mr: 1 }} startIcon={<Edit />} onClick={handleEditCode}>Edit Code</Button>
                                <Button sx={{ mr: 1 }} startIcon={<Delete />} onClick={handleRemoveCode}>Remove Code</Button>
                                <Button startIcon={<><Edit /><Add /></>} onClick={handleEditSnippets}>Snippets</Button>
                            </ButtonGroup><br />
                            <Button onClick={handlePreview}>{preview ? 'Close Preview' : 'Show Preview'}</Button>
                        </div>
                    }
                </div>
            }
            {(!admin || preview) && <div>
                <h2>{admin ? 'student view' : 'Code'}</h2>
                {/* <h2>Sibling of CodeSnippetForm component</h2> */}
                {/* <span>Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed. Error boundaries catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them.</span><br /> */}
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <div>
                            <code>
                                <b>{obj.title}</b><br />
                                <b>{obj.statement}</b><br />
                            </code>
                            {start && <Button variant="contained" size="small" onClick={(e) => { handleStart(e) }}>start</Button>}
                            {
                                <div style={{ margin: '5px' }}>
                                    <form onSubmit={(e) => { handleSubmitAns(e) }}>
                                        {obj.hasOwnProperty('snippets') &&
                                            arraySnippet.slice(0, count).map((ele, i) => {
                                                return <code key={i}>{buildForStudent(ele)}</code>
                                            })
                                        }
                                        <br /><br />
                                        {!start && <><Button sx={{ mr: 1 }} variant="contained" size="small" disabled={prev} onClick={(e) => { handlePrevious(e) }}>Previous</Button>
                                            <Button variant="contained" size="small" disabled={nxt} onClick={(e) => { handleNext(e) }}>Next</Button></>}
                                    </form>
                                    <br />
                                </div>
                            }
                        </div>
                        {errors.length > 0 && <ul>{
                            errors.map((ele, i) => {
                                return <li style={{ color: 'red' }} key={i}>{ele}</li>
                            })
                        }</ul>}
                        <h3>{string}</h3>
                        {(isSubmitted || admin) && <button onClick={() => { handleSolution() }}>See Solution</button>}
                        {/* {(solution || admin) && <ErrorBoundary><CodeSolution codeId={props.codeId} obj={obj} handleSolution={handleSolution} admin={admin} /></ErrorBoundary>} */}
                        {(solution) && <div>
                            <h3>Code Solution</h3>
                            <code>
                                <b>{obj.title}</b><br />
                                <b>{obj.statement}</b><br />
                                {
                                    obj.snippets.slice(0, obj.snippets.length - 1).map(ele => {
                                        return <code key={ele._id}>{buildForSolution(ele)}</code>
                                    })
                                }
                            </code>
                            <br /><button onClick={() => { handleSolution() }}>Close</button>
                        </div>}
                        {(isSubmitted || admin) && <Explanations explanations={explanations} />}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {studHints.length > 0 && <Hint hints={studHints} />}
                    </Grid>
                </Grid>
            </div>}
        </div>
    )
}
export default withRouter(CodeSnippets)