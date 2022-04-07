import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { withRouter } from "react-router-dom"
import { array } from "../actions/userAction"
import { Typography, Grid, Link } from "@mui/material"
import DashboardChart from "./DashboardChart"
import axios from "axios"
import DashboardTable from "./DashboardTable"

const StudentProfile = (props) => {

    const [student, setStudent] = useState({})
    const [chartData, setChartData] = useState([])
    const [score, setScore] = useState({})
    const [answers, setAnswers] = useState([])

    const codes = useSelector(state => {
        return state.codes.data
    })
    const user = useSelector(state => {
        return state.user
    })
    const getAllSubmitted = (id) => {
        axios.get(`http://localhost:3044/api/answers/students/${id}`)
            .then(response => {
                const result = response.data
                if (result.hasOwnProperty('errors')) {
                    //console.log('error', result.errors)
                    alert('Error', result.errors)
                } else {
                    const obj = {}
                    //console.log('get all submitted answers', result)
                    obj['Correct'] = result.obtainedPoints
                    obj['Incorrect'] = result.totalPoints - result.obtainedPoints
                    const arr = Object.entries(obj)
                    setChartData(arr)
                    setScore(result)
                    //console.log('q attended by student login', result.allAnswers)
                    setAnswers(result.allAnswers)
                }
            })
            .catch(err => {
                //console.log(err.message)
                alert(err.message)
            })
    }
    useEffect(() => {
        if (user.role === 'admin') {
            getAllSubmitted(props.match.params.id)
            const s = array.find(ele => ele.id == props.match.params.id)
            //console.log(s)
            setStudent(s)            
        }
        else {
            setStudent(user)
            getAllSubmitted(user.id)
        }
    }, [codes, user])
    //console.log('student, chartdata, score, user, code ', student, chartData, score, user, codes)

    return <div>
        {student?.user_name && <h2>{student.user_name}</h2>}
        {chartData.length > 0 && <>
            <Grid container direction='row'>
                {/* <Grid item marginLeft='0px'><DashboardChart data={chartData} /></Grid> */}
                <Grid item style={{ margin: 'auto 0px' }}>
                    <Typography variant="h6">Total Questions Attempted - {score.totalQuestions}</Typography>
                    <Typography variant="h6">Total Points - {score.totalPoints}</Typography>
                    <Typography variant="h6">Score - {score.obtainedPoints}</Typography>
                </Grid>
                <Grid item><DashboardChart data={chartData} /></Grid>
                <Grid item>
                    <Typography variant="h6">Questions</Typography>
                    <ul>{
                        codes.map(ele => {
                            return <li key={ele._id}><Link>{ele.title}</Link></li>
                        })
                    }</ul>
                </Grid>
            </Grid>
        </>}
        {answers.length > 0 && <DashboardTable heading={`${student.user_name} answers to the questions attempted.`} tableData={answers} /> }
    </div>
}
export default withRouter(StudentProfile)