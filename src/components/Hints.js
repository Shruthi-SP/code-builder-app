import { Grid, Typography } from '@mui/material';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
const Hint = (props) => {
    const { hints } = props

    return (
        <div>
            {/* <h4 style={{marginTop:'3px', marginBottom:'0px'}}>Hints<TipsAndUpdatesOutlinedIcon fontSize='small' /></h4> */}
            <Grid container>
                <Grid item>
                    <Typography color='orangered'>Hints</Typography>
                </Grid>
                <Grid item>
                    <TipsAndUpdatesOutlinedIcon color="warning" fontSize='small' />
                </Grid>
            </Grid>
            <ul>
                {
                    hints.map((ele, i) => {
                        return <li key={i} >{ele}</li>
                    })
                }
            </ul>
        </div>
    )
}
export default Hint