const CodeStepper = (props) => {

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
                        <ul>{step.description.map(ele => {
                            return <li>{ele}</li>
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
}
export default CodeStepper