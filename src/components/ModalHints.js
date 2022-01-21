import { useState } from 'react';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const ModalHints = (props) => {
    const { open, handleClose, hObj, handleHint } = props

    const [clue, setClue] = useState(hObj.hint)

    const handleSubmitHint = (e) => {
        e.preventDefault()
        if (clue.trim().length > 0) {
            const obj = {
                _id: hObj._id ? hObj._id : '',
                hint_id: hObj.hint_id ? hObj.hint_id : '',
                hint: clue
            }
            handleHint(obj)
            handleClose()
        }
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit hint</DialogTitle>
                <DialogContent>
                    <div style={{margin:'5px'}}>
                        <form onSubmit={handleSubmitHint}>
                            <TextField label='Enter hint here' variant='outlined' type='text' value={clue} placeholder="Change Limit" onChange={(e) => { setClue(e.target.value) }} /><br /><br />
                            <Button sx={{ mr: 1 }} variant="contained" size="small" onClick={handleSubmitHint}>Set</Button>
                            <Button variant="contained" size="small" onClick={() => { handleClose() }}>Cancel</Button>
                        </form>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default ModalHints