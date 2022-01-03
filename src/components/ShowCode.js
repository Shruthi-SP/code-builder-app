import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Hints from "./Hints"
import Input from "./tools/Input"
import Break from "./tools/Break"
import Space from "./tools/Space"
import Submit from "./tools/Submit"
import Tab from "./tools/Tab"
import CodeSolution from "./CodeSolution"
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid"
import StepContent from "@mui/material/StepContent"
import Paper from "@mui/material/Paper"
import { asyncGetCode } from "../actions/codesAction"

const ShowCode = (props) => {
    const { admin, isSubmitted, codeObj, handleIsSubmit, codeId, handleInputChange, handleInputBlur, handleSubmitAns, errors, string } = props
    console.log('showCode props=', props)

    const dispatch = useDispatch()

    // const codeSnippet = useSelector(state => {
    //     console.log('total questions', state.codes)
    //     const obj = state.codes.data.find(ele => ele._id === codeId)
    //     console.log('selected question snippets', obj)
    //     return obj
    // })

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

    const getResult = (object) => setCode(object)

    useEffect(() => {
        console.log('useEffect CodeSnip->CodeSnipForm->ShowCode compt')
        dispatch(asyncGetCode(codeId, getResult))
    }, [])

    const [code, setCode] = useState(codeObj)
    const [hints, setHints] = useState([])
    const [solution, setSolution] = useState(false)
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());

    // useEffect(() => {
    //     if (codeObj) {
    //         setCode(codeObj)
    //         const a = getHints(codeObj.snippets)
    //         setHints(a)
    //     }
    // }, [codeObj])

    const handleNext = () => {
        let newSkipped = skipped;
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
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
    const steps = [], hintsArr = []
    let count = 1, start = 0
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
    code.snippets.forEach((ele, i) => {
        let obj = {}, end = i
        if (ele.group === 'input') {
            obj.label = `input-${count}`
            obj.description = getHints(code.snippets.slice(start, i + 1))
            count++
            steps.push(obj)
            start = i + 1
        }
    })
    console.log('show code steps=', steps, hintsArr)

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
            <Grid item xs={12} sm={6}>
                {/* <Box sx={{ width: '100%' }}>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>
                                        {label}
                                    </StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                All steps completed
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleReset}>Reset</Button>
                            </Box>
                        </>
                    ) : (
                        <>
                            <Typography component={'span'} sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}
                                <ul>
                                    {hintsArr[activeStep].map((ele, i) => {
                                        return <li key={i}>{ele}</li>
                                    })}
                                </ul>
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    Back
                                </Button>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleNext}>
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </Box>
                        </>
                    )}
                </Box> */}
                <Box sx={{ maxWidth: 400 }}>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((step, index) => (
                            <Step key={step.label}>
                                <StepLabel
                                    optional={
                                        index === steps.length - 1 ? (
                                            <Typography variant="caption">Last step</Typography>
                                        ) : null
                                    }
                                >
                                    {step.label}
                                </StepLabel>
                                <StepContent>
                                    <ul>{step.description.map((ele, i) => {
                                        return <li key={i}>{ele}</li>
                                    })}</ul>
                                    <Box sx={{ mb: 2 }}>
                                        <div>
                                            <Button
                                                variant="contained"
                                                onClick={handleNext}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                            </Button>
                                            <Button
                                                disabled={index === 0}
                                                onClick={handleBack}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                Back
                                            </Button>
                                        </div>
                                    </Box>
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length && (
                        <Paper square elevation={0} sx={{ p: 3 }}>
                            <Typography>All steps completed</Typography>
                            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                                Reset
                            </Button>
                        </Paper>
                    )}
                </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
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
                {isSubmitted && <button onClick={() => { handleSolution() }}>See Solution</button>}
                {(solution || admin) && <CodeSolution codeId={props.codeId} handleSolution={handleSolution} />}
            </Grid>
        </Grid>
    </>

}
export default ShowCode