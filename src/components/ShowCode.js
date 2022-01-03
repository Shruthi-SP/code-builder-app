import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
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
/*
const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
*/

const ShowCode = (props) => {
    const {admin, isSubmitted, handleIsSubmit, codeId, handleInputChange, handleInputBlur, handleSubmitAns, errors, string } = props

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
    const getInputs = (a) => {
        const ar = a.filter(ele=>ele.group==='input')
        console.log('inputs for stepper=', ar)
        return ar
    }
    
    const [code, setCode] = useState(codeSnippet || {})
    const [hints, setHints] = useState([])
    const [solution, setSolution] = useState(false)

    useEffect(() => {
        if (codeSnippet) {
            setCode(codeSnippet)
            const a = getHints(codeSnippet.snippets)
            setHints(a)
        }
    }, [codeSnippet])

    const handleSolution = () => {
        handleIsSubmit()
        setSolution(!solution)
    }
    const steps = []
    let count = 1
    code.snippets.forEach((ele, i)=>{
        if(ele.group === 'input'){
           steps.push(`input${count}`)
           count++
        }
    })
    console.log('show code steps=', steps)

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

    return <div style={{ display: 'flex', justifyContent: 'start' }}>
        <div>
            {admin ? <h3>Code Preview</h3> : <h3>Code</h3>}
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
        </div>
        <div>
            {
                hints.length > 0 && <Hints hints={hints} />
            }
        </div>
    </div>
}
export default ShowCode