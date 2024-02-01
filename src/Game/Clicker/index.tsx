import { Box } from "@mui/material";
import useStyle from './style'

export default function Clicker() {
    const classes = useStyle();

    return (
        <>
            <Box className={classes.container}>Clicker :D</Box>
        </>
    )
}