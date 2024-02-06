import { Box, Grid } from "@mui/material";
import useStyle from './style'

interface ClickerProps {
    onClick: () => void
    grains: number
}

export default function Clicker({ onClick, grains }: ClickerProps) {
    const classes = useStyle();

    return (
        <>
            <Grid container className={classes.container}>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    className={classes.riceContainer}
                >
                    <Box>You have <b>{ grains }</b> RYSST-grains</Box>
                    <Box component={"img"} className={classes.rice} src="/rysst_cooker.png" onClick={onClick}/>
                </Grid>
                <Box></Box>
            </Grid>
        </>
    )
}