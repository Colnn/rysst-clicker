import { Box, Button, Grid } from "@mui/material";
import useStyle from './style'

export default function Clicker() {
    const classes = useStyle();

    const onClick = () => {
        console.log("Clicked :D");
    }

    return (
        <>
            <Grid container className={classes.container}>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    className={classes.riceContainer}
                >
                    <button className={classes.rice} onClick={onClick}>
                        Click this :D
                    </button>
                </Grid>
                <Box></Box>
            </Grid>
        </>
    )
}