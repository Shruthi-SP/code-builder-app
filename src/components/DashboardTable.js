import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { array } from '../actions/userAction';
import { useSelector } from 'react-redux';

const DashboardTable = (props) => {
  const { heading, tableData } = props
  console.log('DT props=', heading, tableData)

  const codes = useSelector(state=>{
    return state.codes
  })

  function createData(name, question, answers, score, id) {
    return { name, question, answers, score, id };
  }

  // const rows = tableData.map(ele => {
  //   return createData(ele.studentId, ele.codeId, ele.answers, ele.score, ele._id)
  // })

  const getStudentName = (id) => {
    const student = array.find(ele => ele.id == id)
    //console.log('get student name=',student)
    return student.user_name
  }
  const getCodeTitle = (id) => {
    const code = codes.data.find(ele=>ele._id==id)
    //console.log('get code', code)
    return code.statement
  }
  const rows = tableData.map(ele => {
    return createData(getStudentName(ele.studentId), getCodeTitle(ele.codeId), ele.answers, ele.score, ele._id)
  })

  function BasicTable() {
    return (
      <TableContainer component={Paper}>
        <Typography variant='h6'>{heading}</Typography>
        <Table sx={{ maxWidth: 850 }}>
          <TableHead>
            <TableRow>
              <TableCell >Student Name</TableCell>
              <TableCell >Statement</TableCell>
              <TableCell >Answers</TableCell>
              <TableCell >Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell >{row.name}</TableCell>
                <TableCell >{row.question}</TableCell>
                <TableCell ><ul style={{ listStyleType: 'none' }}>
                  {row.answers.map((ele, i) => {
                    return <li key={ele.snipId}>{ele.snipAnswer}</li>
                  })}
                </ul></TableCell>
                <TableCell >{row.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  return <BasicTable />
}
export default DashboardTable