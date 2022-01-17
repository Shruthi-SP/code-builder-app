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

const CodeSnippets = (props) => {
    console.log('code snippet compt props=', props, props.match.params.id)
    const { admin } = props
    const _id = props.match.params.id
    console.log('props.match.params.id', _id)

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

    // const codes = useSelector(state => {
    //     console.log('useSelector in CS', state.codes)
    //     return state.codes
    // })

    // useEffect(() => {
    //     if (codes && codes.isLoading === true) {
    //         const code = codes.data.find(ele => ele._id === _id)
    //         setObj(code)
    //         setArraySnippet(code.snippets)
    //         let cs = JSON.parse(localStorage.getItem('user_inputs'))
    //         // if (cs && cs.length > 0) {
    //         //     setArraySnippet(cs)
    //         // }
    //         if(localStorage.user_inputs){
    //             setArraySnippet(cs)
    //         }
    //         console.log('CS ue2 codes var', code, code.snippets)
    //     }
    // }, [codes])
    const getResult = (object) => {
        console.log('**********getting the code*********')
        if (Object.keys(object).length > 0) {
            console.log('getResult fn got code in cs', object)
            setObj(object)
            let cs = JSON.parse(localStorage.getItem('user_inputs'))
            if (cs && cs.length > 0) {
                setArraySnippet(cs)
            }else{
                setArraySnippet(object.snippets)
            }
            console.log('cs in ue1 cs, object, object.snippets', cs, object, object.snippets)
            const h = getHints(object.snippets)
            setHints(h)
            const ex = getExplanations(object.snippets)
            setExplanations(ex)
        }
        else throw new Error('Code Snippets crashed, couldnt get the obj')
    }
    const dispatch = useDispatch()
    useEffect(() => {
        console.log('1st useEffect CodeSnip compt')
        dispatch(asyncGetCode(_id, getResult))
    }, [])

    window.onload = (e) => {
        console.log('on window load:', JSON.parse(localStorage.getItem('user_inputs')))
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
    console.log('userInput in cs, obj, arraySnippet', userInput, obj, arraySnippet)
    const handleInputChange = (e, ele) => {
        const arr = [...arraySnippet]
        const result = arr.find(element => element._id === ele._id)
        result.value = e.target.value.trim()
        console.log('handleInputChange', arr)
        localStorage.setItem('user_inputs', JSON.stringify(arr))
        console.log('handleInputChange', arr, localStorage)
        setArraySnippet(arr)
    }
    const handleInputBlur = (e, ele) => {
        const arr = [...arraySnippet]
        const result = arr.find(element => element._id === ele._id)
        result.isDisable = true
        console.log('handleInputBlur')
        localStorage.setItem('user_inputs', JSON.stringify(arr))
        console.log('handleInputBlur', result, arr, JSON.parse(localStorage.user_inputs))
        setArraySnippet(arr)
    }
    const handleIsSubmit = () => {
        setIsSubmitted(false)
    }
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
        //localStorage.clear()
        localStorage.removeItem('user_inputs')
    }
    const handleStart = (e) => {
        e.preventDefault()
        console.log('start fired')
        setStart(!start)
        setPrev(true)
        const a = obj.snippets.find(ele => ele.group === 'input')
        const index = obj.snippets.findIndex(ele => ele.group === 'input')
        const h = getHints(obj.snippets.slice(0, index + 1))
        setStudHints(h)
        setCount(index + 1)
        console.log('start count, obj, obj.id, index, hints',count, a, a.id, index, h)
    }

    const handleNext = (e) => {
        e.preventDefault()
        setPrev(false)
        if (count < obj.snippets.length) {
            console.log('next', count)
            const a = obj.snippets.slice(count).find(ele => ele.group === 'input')
            if (a) {
                const index = Number(a.id) + 1
                const h = getHints(obj.snippets.slice(0, index))
                setStudHints(h)
                console.log('next a, index, h', a, index, h)
                setCount(index)
            } else {
                setCount(obj.snippets.length)
                const h = getHints(obj.snippets)
                setStudHints(h)
                console.log('no input field', h)
                setNxt(true)
            }
        }
        console.log('nxt fired')
    }
    const handlePrevious = (e) => {
        e.preventDefault()
        setNxt(false)
        const arr = [...obj.snippets].reverse()
        console.log('prev event fired', arr, count)
        if (count > 0) {
            const a = arr.slice((arr.length) - (count - 1)).find(ele => ele.group === 'input')
            if (a) {
                let index = a.id + 1
                const h = getHints(obj.snippets.slice(0, index))
                setStudHints(h)
                console.log('prev', a, a.id, index, h)
                setCount(index)
            } else {
                setCount(count)
                console.log('no input field', a)
                setPrev(true)
            }

        } 
    }

    const handleSolution = () => {
        handleIsSubmit()
        setSolution(!solution)
    }

    const redirect = () => {
        console.log('redirecting from code snippets to codes list')
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
            if (ele.hasOwnProperty('hint')) {
                // if(ele.hints.length>0){
                //     for(let i=0;i<ele.hints.length;i++){
                //         ar.push(ele.hints[i])
                //     }
                // }
                if (ele.hint !== '') {
                    ar.push(ele.hint)
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
                (admin && Object.keys(obj).length > 0) ? <div style={{ margin: '5px' }}>
                    <h3>Admin view</h3>
                    <Typography variant="h5" color="primary.dark">Code and Snippets</Typography>
                    {snippetToggle ? <>
                        {arraySnippet.length > 0 && <>
                            <h3>Admin create snippet form</h3>
                            <ErrorBoundary><CodeSnippetForm admin={admin} codeId={_id} {...props} obj={obj} /></ErrorBoundary>
                        </>
                        }</>
                        : <>
                            {
                                arraySnippet.length > 0 ? <div>
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
                                    </ButtonGroup>
                                </div> : <div>
                                    <p>No Object</p>
                                </div>
                            }
                        </>
                    }

                </div>
                    :
                    <h3>student view</h3>
            }
            <div>
                <h1>Code</h1>
                {/* <h2>Sibling of CodeSnippetForm component</h2> */}
                {/* <span>Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed. Error boundaries catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them.</span><br /> */}
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        {/* <div> */}
                            <div>
                                {admin && <h3>Student view</h3>}
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
                        {/* </div> */}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {studHints.length > 0 && <Hint hints={studHints} />}
                    </Grid>
                </Grid>
            </div>

        </div >
    )
}
export default CodeSnippets