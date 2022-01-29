import { Grid, Card, CardContent, CardActions, Button, Typography } from "@mui/material";
const DashboardCard = (props) => {
    const { heading, number } = props
    return <Grid item >
        <Card sx={{ minWidth: 275, m:2, ml:0 }}>
            <CardContent>
                <Typography variant="h5" component="div" color='primary.dark'>
                    {heading}
                </Typography>
                <Typography variant="h4">
                    {number}
                </Typography>
            </CardContent>
            {/* <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions> */}
        </Card>
    </Grid>
}
export default DashboardCard