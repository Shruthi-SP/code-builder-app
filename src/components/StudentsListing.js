import { Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { array } from "../actions/userAction"

const StudentsListing = (props) => {

    const [students, setStudents] = useState([])

    useEffect(() => {
        props.handleCancelShow()
        const s = array.filter(ele => ele.role === 'student')
        console.log('students pg=', s)
        setStudents(s)
    }, [])

    return (
        <>{
            students.length === 0 ? <div><h2>StudentsListing crashed! No array of students</h2></div> : <div style={{ marginLeft: '5px' }}>
                <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>Listing Students: {students.length}</Typography>
                <ul>
                    {students.map((ele, i) => {
                        return < li key={i}>
                            <Link to={`/students/${ele.id}`}>{ele.user_name}</Link>
                        </li>
                    })}
                </ul>
            </div>
        }</>
    )
}
export default StudentsListing