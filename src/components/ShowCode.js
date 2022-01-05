import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Hints from "./Hints"
import Input from "./tools/Input"
import Break from "./tools/Break"
import Space from "./tools/Space"
import Submit from "./tools/Submit"
import Tab from "./tools/Tab"
import CodeSolution from "./CodeSolution"
import { Button, Grid } from "@mui/material"
import CodeStepper from "./CodeStepper"

const ShowCode = (props) => {
    const { admin, isSubmitted, handleIsSubmit, codeId, codeObj, handleInputChange, handleInputBlur, handleSubmitAns, errors, string } = props

    //console.log('showCode props=', props)

    const codeSnippet = useSelector(state => {
        //console.log('total questions', state.codes)
        const obj = state.codes.data.find(ele => ele._id === codeId)
        //console.log('selected question snippets', obj)
        return obj
    })

    const getHints = (a) => {
        const ar = []
        a.forEach(ele => {
            if (ele.hasOwnProperty('hint')) {
                if (ele.hint !== '') {
                    ar.push(ele.hint)
                }
            }
        })
        return ar
    }

    const [code, setCode] = useState(codeSnippet || codeObj || {})
    const [hints, setHints] = useState([])
    const [solution, setSolution] = useState(false)
    const [start, setStart] = useState(true)
    const [prev, setPrev] = useState(false)
    const [nxt, setNxt] = useState(false)
    const [count, setCount] = useState(0)
    const [studHints, setStudHints] = useState([])

    useEffect(() => {
        if (codeSnippet) {
            setCode(codeSnippet)
            const a = getHints(codeSnippet.snippets)
            setHints(a)
        }
    }, [codeSnippet])

    // const indices = []
    // code.snippets.forEach((ele, i) => {
    //     if (ele.group === 'input') {
    //         indices.push(i)
    //     }
    // })
    // console.log('indices = ', indices)
    // let index = 0

    const handleStart = (e) => {
        e.preventDefault()
        console.log('start fired')
        setStart(!start)
        const a = code.snippets.find(ele => ele.group === 'input')
        const index = code.snippets.findIndex(ele => ele.group === 'input')
        const h = getHints(code.snippets.slice(0, index+1))
        setStudHints(h)
        console.log('start hints', h)
        setCount(index + 1)
        console.log('start', a, index)
        // setCount(indices[index]+1)
        // index++
        // console.log('start', indices[index]+1, index)
    }

    const handleNext = (e) => {
        e.preventDefault()
        setPrev(false)
        // if(count < code.snippets.length && index < indices.length){
        //     console.log('next event', count, index)
        //     setCount(indices[index] + 1)
        //     index++
        // }
        if (count < code.snippets.length) {
            console.log('next', count)
            const a = code.snippets.slice(count).find(ele => ele.group === 'input')
            if (a) {
                const index = Number(a.id) + 1
                const h = getHints(code.snippets.slice(0, index))
                setStudHints(h)
                console.log('next', a, index, h)
                setCount(index)
            } else {
                setCount(code.snippets.length)
                const h = getHints(code.snippets)
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
        const arr = [...code.snippets].reverse()
        console.log('prev', arr, count)
        if (count > 0 ) {
            const a = arr.slice((arr.length)-(count-1)).find(ele => ele.group === 'input')
            if(a){
                let index = a.id + 1
                const h = getHints(code.snippets.slice(0, index))
                setStudHints(h)
                console.log('prev', a, a.id, index, h)
                setCount(index)
            }else{
                console.log('no input field', a)
                setPrev(true)
            }
            
        }

        console.log('prev fired')

    }
    const handleSolution = () => {
        handleIsSubmit()
        setSolution(!solution)
    }

    const buildFor = (ele) => {
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

    return <>
        {admin ? <h3>Code Preview</h3> : <h3>Code</h3>}
        <Grid container>
            {/* <Grid item xs={12} sm={6}>
                <CodeStepper getHints={getHints} codeSnippets={code.snippets} />
            </Grid> */}
            <Grid item xs={12} sm={6}>
                {admin && <div>
                    <code>
                        <b>{code.title}</b><br />
                        <b>{code.statement}</b><br />
                    </code>
                    {
                        <div style={{ margin: '5px' }}>
                            <form onSubmit={(e) => { handleSubmitAns(e) }}>
                                {code.hasOwnProperty('snippets') &&
                                    code.snippets.map((ele, i) => {
                                        return <code key={i}>{buildFor(ele)}</code>
                                    })
                                }
                            </form>
                            <br />
                        </div>
                    }
                    {errors.length > 0 && <ul>{
                        errors.map((ele, i) => {
                            return <li style={{ color: 'red' }} key={i}>{ele}</li>
                        })
                    }</ul>}
                    <h3>{string}</h3>
                    {(isSubmitted && !admin) && <button onClick={() => { handleSolution() }}>See Solution</button>}
                </div>}
                <div>
                    {admin && <h3>Student view</h3>}
                    <code>
                        <b>{code.title}</b><br />
                        <b>{code.statement}</b><br />
                    </code>
                    {start && <Button variant="contained" size="small" onClick={(e) => { handleStart(e) }}>start</Button>}
                    {
                        <div style={{ margin: '5px' }}>
                            <form onSubmit={(e) => { handleSubmitAns(e) }}>
                                {code.hasOwnProperty('snippets') &&
                                    code.snippets.slice(0, count).map((ele, i) => {
                                        return <code key={i}>{buildFor(ele)}</code>
                                    })
                                }
                                <br /><br />
                                {!start && <><Button sx={{ mr: 1 }} variant="contained" size="small" disabled={prev} onClick={(e) => { handlePrevious(e) }}>Previous</Button>
                                <Button variant="contained" size="small" disabled={nxt} onClick={(e) => { handleNext(e) }}>Next</Button></>}
                            </form>
                            <br />
                        </div>
                    }
                    {errors.length > 0 && <ul>{
                        errors.map((ele, i) => {
                            return <li style={{ color: 'red' }} key={i}>{ele}</li>
                        })
                    }</ul>}
                    <h3>{string}</h3>
                    {(isSubmitted && !admin) && <button onClick={() => { handleSolution() }}>See Solution</button>}
                    {(solution || admin) && <CodeSolution code={code} handleSolution={handleSolution} admin={admin} />}
                </div>
            </Grid>
            <Grid item xs={12} sm={6}>
                {(hints.length > 0 && admin) && <Hints hints={hints} />}
                {studHints.length > 0 && <Hints hints={studHints}/>}
            </Grid>
        </Grid>

    </>
}
export default ShowCode