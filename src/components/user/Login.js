import { useState } from "react"
import { withRouter } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { asyncSetUser } from "../../actions/userAction"
import validator from 'validator'
import { Typography, TextField, Button} from "@mui/material"

const Login = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formErr, setFormErr] = useState({})
    const err = {}
    const dispatch = useDispatch()

    const runValidation = () => {
        if(email.trim().length === 0){
            err.email = 'email required'
        }
        else if(!validator.isEmail(email)){
            err.email = 'email format is not valid'
        }
        if(password.trim().length === 0){
            err.password = 'password required'
        }
    }

    const handleChange = (e) =>{
        const attr = e.target.name
        const value = e.target.value
        if(attr==='email'){
            setEmail(value)
        }
        if(attr==='password'){
            setPassword(value)
        }
    }

    const handleLoginSubmit = (e) => {
        e.preventDefault()
        runValidation()
        const redirect = (obj) => {
            // props.handleLoggedIn()
            // if(obj.role==='admin'){
            //     props.handleAdmin()
            // }
            props.history.push('/codes')
        }
        if(Object.keys(err).length === 0){
            const formData = {
                email: email,
                password: password
            }
            dispatch(asyncSetUser(formData, redirect))
        }
        else {
            setFormErr(err)
        }
    }

    return <div>
        <Typography variant="h5" mb={1}>Login</Typography>
        <form onSubmit={handleLoginSubmit}>

            <TextField label='Enter your email' variant='outlined' type='text' name='email' value={email} onChange={handleChange}></TextField><br />
            {formErr.email && <span style={{color:'red'}}>{formErr.email}</span>}<br />

            <TextField label='Enter password' variant='outlined' type='password' name='password' value={password} onChange={handleChange} ></TextField> <br />
            {formErr.password && <span style={{color:'red'}}>{formErr.password}</span>}<br />

            <Button sx={{ mr: 1 }} type="submit" variant="contained" color="primary" size="small">Submit</Button>

        </form>
    </div>
}
export default withRouter(Login)