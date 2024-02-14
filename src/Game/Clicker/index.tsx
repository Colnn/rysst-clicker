import { Box, Grid } from '@mui/material';
import useStyle from './style';
import prettyNumber from '../../prettyNumber';

interface ClickerProps {
    onClick: () => void
    grains: number
    gps: number
}

export default function Clicker({ onClick, grains, gps }: ClickerProps) {
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
                    <Box>You have <b>{ prettyNumber(grains, 3) }</b> RYSST-grains</Box>
                    <Box>Grains per second: <b>{ prettyNumber(gps, 'number-short') }</b></Box>
                    <Box component={"img"} className={classes.rice} src="/rysst_cooker.png" onClick={onClick}/>
                </Grid>
                <Box></Box>
            </Grid>
        </>
    )
}
