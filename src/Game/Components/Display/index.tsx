import { Box } from "@mui/material";
import useStyle from './style'

export default function Display() {
    const classes = useStyle();

    return (
        <>
            <Box className={classes.container}>Display :D</Box>
        </>
    )
}