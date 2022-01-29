import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Grid, Card, CardContent, CardActions, Button, Typography, Divider } from "@mui/material";
import { array } from "../actions/userAction";
import DashboardTable from "./DashboardTable";
import DashboardCard from "./DashboardCard";
import { FastForward } from "@mui/icons-material";
import DashboardChart from "./DashboardChart";
const CodeDashboard = (props) => {
    const codesR = useSelector(state => {
        return state.codes
    })
    const user = useSelector(state => {
        return state.user
    })

    const getArray = (a) => {
        const r = a.map(ele => {
            return { ...ele, label: ele.statement }
        })
        return r
    }

    const [answers, setAnswers] = useState([])
    const [codes, setCodes] = useState([])
    const [auto, setAuto] = useState([])
    const [statement, setStatement] = useState(null)
    const [student, setStudent] = useState(null)
    const [chartData, setChartData] = useState([])
    const [score, setScore] = useState({})
    const [studentsAll, setStudentsAll] = useState([])
    const [studentSpec, setStudentSpec] = useState([])

    const getAllSubmitted = (id) => {
        axios.get(`http://localhost:3044/api/answers/students/${id}`)
            .then(response => {
                const result = response.data
                if (result.hasOwnProperty('errors')) {
                    console.log('error', result.errors)
                } else {
                    const obj = {}
                    obj['Correct'] = result.obtainedPoints
                    obj['Incorrect'] = result.totalPoints - result.obtainedPoints
                    const arr = Object.entries(obj)
                    setChartData(arr)
                    setScore(result)
                }
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    useEffect(() => {
        let result
        axios.get('http://localhost:3044/api/answers')
            .then((response) => {
                result = response.data
                if (result.hasOwnProperty('errors')) {
                    console.log(result.errors)
                }
                else {
                    setAnswers(result)
                }
            }).catch((err) => {
                console.log(err.message)
            })
        setCodes(codesR.data)
        setAuto(getArray(codesR.data))
        if (!props.admin) {
            setStudent(user)
            getAllSubmitted(user.id)
        }
    }, [codesR])

    const defaultProps = {
        options: array,
        getOptionLabel: (option) => option.user_name,
    };

    const handleGo = () => {
        if (statement && student) {
            axios.get(`http://localhost:3044/api/answers/codes/${statement._id}/students/${student.id}`)
                .then(response => {
                    const result = response.data
                    if (result.hasOwnProperty('errors')) {
                        console.log('error', result.errors)
                    } else {
                        setStudentSpec(result)
                    }
                })
                .catch(err => {
                    console.log(err.message)
                })

        }
        if (student) {
            getAllSubmitted(student.id)
        }
        if (statement) {
            axios.get(`http://localhost:3044/api/answers/codes/${statement._id}`)
                .then(response => {
                    const result = response.data
                    if (result.hasOwnProperty('errors')) {
                        console.log('error', result.errors)
                    } else {
                        setStudentsAll(result)
                    }
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
    }

    return <div>
        <Typography variant="h4">{props.admin ? 'Admin ' : 'Student '}Dashboard</Typography>
        <Grid container direction='row' >
            <DashboardCard heading='Total Codes' number={codes.length} />
            {props.admin && <><DashboardCard heading='Total Students' number={array.length} />
                <DashboardCard heading='Total Answers' number={answers.length} /></>}
        </Grid>
        <Divider sx={{ m: 2, ml: 0 }} />
        {chartData.length > 0 && <>
            <Grid container direction='row'>
                <Grid item><DashboardChart data={chartData} /></Grid>
                <Grid item style={{ margin: 'auto 0px', display: 'block' }}>
                    <Typography variant="h6">Total Questions Attempted - {score.totalQuestions}</Typography>
                    <Typography variant="h6">Total Points - {score.totalPoints}</Typography>
                    <Typography variant="h6">Score - {score.obtainedPoints}</Typography>
                </Grid>
            </Grid>
        </>}
        <Grid container direction='row'>
                <Grid item>
                    <Autocomplete
                        options={auto}
                        //{...defaultProps}
                        sx={{ width: 300, m: 2, ml: 0 }}
                        value={statement}
                        onChange={(event, newValue) => {
                            setStatement(newValue);
                        }}
                        // renderInput={(params) => (
                        //   <TextField {...params} label="Codes" variant="standard" />
                        // )}
                        //onChange={(e)=>{setValue(e.target.value)}}
                        renderInput={(params) => <TextField {...params} label="Select the Code" />}
                    />
                </Grid>
                {props.admin && <Grid>
                    <Autocomplete
                        {...defaultProps}
                        sx={{ width: 300, m: 2 }}
                        value={student}
                        onChange={(event, newValue) => {
                            setStudent(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} label="Select the Student" />}
                    />
                </Grid>}
                <Button variant="contained" size="small" endIcon={<FastForward />} sx={{ mt: 2, ml: 2, p: 0, maxHeight: 52 }} onClick={handleGo}>Go</Button>
            </Grid>
        {studentSpec.length > 0 && <DashboardTable heading={`A student's attempt to specific question`} tableData={studentSpec} />}
        {(studentsAll.length > 0 && props.admin) && <DashboardTable heading={`All student's answer to specific question`} tableData={studentsAll} />}
    </div>
}
export default CodeDashboard