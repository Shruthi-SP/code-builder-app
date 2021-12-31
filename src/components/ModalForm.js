import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from "react-redux"
import { asyncUpdateSnippet } from '../actions/codesAction'
import FromInput from "./FormInput"
import FormText from './FormText'

const ModalForm = (props) => {
    console.log('edit snippets compt', props)
    const {open,handleClose, codeId, snippet, handleCancelEdit} = props
    const dispatch = useDispatch()

    const [editLimit, setEditLimit] = useState('')

    const formSubmission = (formData) => {
        dispatch(asyncUpdateSnippet(codeId, snippet._id, formData))
        handleCancelEdit()
        console.log('dispatching update')
    }
    const handleSetLimit = (e) => {
        e.preventDefault()
        const formData = {
            limit: editLimit
        }
        console.log('setLimit', formData)
        formSubmission(formData)
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Snippet</DialogTitle>
                <DialogContent>
                    {snippet.group === 'texts' && <FormText {...snippet} formSubmission={formSubmission} handleCancelEdit={handleCancelEdit} />}

                    {snippet.group === 'input' && <FromInput {...snippet} formSubmission={formSubmission} handleCancelEdit={handleCancelEdit} />}

                    {snippet.group === 'break' && <><input type='text' value={editLimit} placeholder="Change Limit" onChange={(e) => { setEditLimit(e.target.value) }} /><button onClick={handleSetLimit}>Set</button><button onClick={() => { handleCancelEdit() }}>Cancel</button></>}

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default ModalForm