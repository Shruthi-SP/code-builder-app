import { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import StepContent from "@mui/material/StepContent"
import Paper from "@mui/material/Paper"

const CodeStepper = (props) => {
    const {codeSnippets, getHints} = props

    const [activeStep, setActiveStep] = useState(0);

    const steps = [], hintsArr = []
    let count = 1, start = 0
    //--------------------------horizontal stepper------------------------
    // codeObjSsnippets.forEach((ele, i) => {
    //     //let end = i
    //     if (ele.group === 'input') {
    //         steps.push(`input-${count}`)
    //         count++
    //         const arr = getHints(codeSnippets.slice(start, i + 1))
    //         hintsArr.push(arr)
    //         start = i + 1
    //     }
    // })

    //-------------------------vertical stepper---------------------------
    codeSnippets.forEach((ele, i) => {
        let obj = {}
        if (ele.group === 'input') {
            obj.label = `input-${count}`
            obj.description = getHints(codeSnippets.slice(start, i + 1))
            count++
            steps.push(obj)
            start = i + 1
        }
    })

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return <>
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
    </>
}
export default CodeStepper