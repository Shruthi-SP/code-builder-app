import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Hints from "./Hints"
import Input from "./tools/Input"
import Break from "./tools/Break"
import Space from "./tools/Space"
import Submit from "./tools/Submit"
import Tab from "./tools/Tab"
import CodeSolution from "./CodeSolution"
import { Grid } from "@mui/material"
import CodeStepper from "./CodeStepper"
import ErrorBoundary from "./ErrorBoundary"
import Explanations from "./Explanations"

const ShowCode = (props) => {
    const { admin, isSubmitted, handleIsSubmit, codeId, handleInputChange, handleInputBlur, handleSubmitAns, errors, string } = props

    console.log('showCode props=', props)

    const codeSnippet = useSelector(state => {
        console.log('total questions', state.codes)
        const obj = state.codes.data.find(ele => ele._id === codeId)
        console.log('selected question snippets', obj)
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

    const [code, setCode] = useState(codeSnippet || {})
    const [hints, setHints] = useState([])
    const [solution, setSolution] = useState(false)
    const [activeStep, setActiveStep] = useState(0);
    const [explanations, setExplanations] = useState([])

    useEffect(() => {
        if (codeSnippet) {
            setCode(codeSnippet)
            const a = getHints(codeSnippet.snippets)
            setHints(a)
            const ex = getExplanations(codeSnippet.snippets)
            setExplanations(ex)
        }
        else throw new Error('I ShowCode crashed! Code is {}');
    }, [codeSnippet])

    const steps = [], hintsArr = []
    let count = 1, start = 0
    //--------------------------horizontal stepper------------------------
    // codeObj.snippets.forEach((ele, i) => {
    //     //let end = i
    //     if (ele.group === 'input') {
    //         steps.push(`input-${count}`)
    //         count++
    //         const arr = getHints(code.snippets.slice(start, i + 1))
    //         hintsArr.push(arr)
    //         start = i + 1
    //     }
    // })

    //-------------------------vertical stepper---------------------------
    code.snippets.forEach((ele, i) => {
        let obj = {}
        if (ele.group === 'input') {
            obj.label = `input-${count}`
            obj.description = getHints(code.snippets.slice(start, i + 1))
            count++
            steps.push(obj)
            start = i + 1
        }
    })
    console.log('show code steps=', steps, hintsArr)

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

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
                <div>
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
                    {(isSubmitted || !admin) && <button onClick={() => { handleSolution() }}>See Solution</button>}
                    {(solution || admin) && <ErrorBoundary><CodeSolution codeId={props.codeId} obj={code} handleSolution={handleSolution} admin={admin} /></ErrorBoundary>}
                    {(isSubmitted || admin) && <Explanations explanations={explanations} />}
                </div>
            </Grid>
        </Grid>

    </>
}
export default ShowCode