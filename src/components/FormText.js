import { useState } from "react"
import { Button, TextField, Typography, IconButton } from "@mui/material"
import { Add, Cancel, Edit } from "@mui/icons-material"
import ModalHints from "./ModalHints"

const FormText = (props) => {
    const { handleCancelText, handleCancelEdit, formSubmission, value: editTxt, hint: editHint, hints: editHints, explanation: editExplain } = props
    const [txt, setTxt] = useState(editTxt ? editTxt : '')
    const [hint, setHint] = useState(editHint ? editHint : '')
    const [hints, setHints] = useState(editHints ? editHints : [])
    const [explain, setExplain] = useState(editExplain ? editExplain : '')
    const [hObj, setHObj] = useState({})
    const [open, setOpen] = useState(false)
    const [err, setErr] = useState({})
    const errors = {}

    const runValidation = () => {
        if (txt.trim().length === 0) {
            errors.txt = 'text is required'
        }
        if (hint.trim().length > 0) {
            errors.hint = 'click on + icon to add hints and then submit'
        }
    }

    const handleClose = () => setOpen(false)

    const handleEditHint = (e, obj) => {
        e.preventDefault()
        setOpen(true)
        setHObj(obj)
    }

    const handleHint = (obj) => {
        const newHints = hints.map(ele => {
            if (ele._id === obj._id || ele.hint_id === obj.hint_id) {
                return { ...obj }
            }
            else {
                return ele
            }
        })
        setHints(newHints)
    }

    const handleRemoveHint = (e, obj) => {
        e.preventDefault()
        const h = hints.filter(ele => ele._id !== obj._id || ele.hint_id !== obj.hint_id)
        setHints(h)
        setHint('')
    }

    const handleAddHints = (e) => {
        e.preventDefault()    
        if(hint.trim().length > 0){
            const h = {
                hint: hint,
                hint_id: new Date().getTime()
            }
            const newHints = [...hints, h]
            setHints(newHints)
            setHint('')
        } 
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        runValidation()
        if (Object.keys(errors).length === 0) {
            setErr({})
            const obj = {
                group: 'texts',
                value: txt,
                hints: hints,
                explanation: explain,
                hint: hint
            }
            formSubmission(obj)
        } else {
            setErr(errors)
        }
    }

    return <div style={{ margin: '10px' }}>
        <Typography variant="h5" mb={1}>Text Form</Typography>

        {open && <ModalHints open={open} handleClose={handleClose} hObj={hObj} handleHint={handleHint} />}
        <form onSubmit={handleSubmit}>
            <TextField label='Enter text' variant='outlined' type='text' value={txt} onChange={(e) => { setTxt(e.target.value) }}></TextField><br />
            {err.txt && <span style={{ color: 'red' }}>{err.txt}</span>}<br />

            {hints.length > 0 && <><h4 style={{ m: '0px' }}>Hints</h4>{hints.map((ele) => {
                return <li
                    key={ele.hint_id ? ele.hint_id : ele._id}>
                    {ele.hint}
                    <IconButton variant="outlined" color="success" size="small" onClick={(e) => { handleEditHint(e, ele) }}><Edit /></IconButton>
                    <IconButton variant="outlined" color="error" size="small" onClick={(e) => { handleRemoveHint(e, ele) }}><Cancel /></IconButton>
                </li>
            })}</>}

            <TextField label='Add new hint here' variant='outlined' type='text' value={hint} onChange={(e) => { setHint(e.target.value) }} ></TextField>

            <IconButton sx={{ m: 1, ml: 0 }} variant="outlined" color="primary" size="large" onClick={(e) => { handleAddHints(e) }}><Add /></IconButton><br />
            {err.hint && <span style={{ color: 'red' }}>{err.hint}</span>}<br />

            <TextField label='Enter explanation here' variant='outlined' type='text' value={explain} onChange={(e) => { setExplain(e.target.value) }} ></TextField> <br /><br />

            <Button sx={{ mr: 1 }} type="submit" variant="contained" color="primary" size="small">Submit</Button>

            <Button variant="contained" size="small" onClick={() => { editTxt ?  handleCancelEdit() : handleCancelText() }}>Cancel</Button>

        </form>
    </div>
}
export default FormText