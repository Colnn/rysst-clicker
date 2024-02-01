import { Box } from "@mui/material";
import useStyle from './style'

export default function Shop() {
    const classes = useStyle();

    return (
        <>
            <Box className={classes.container}>Shop :D</Box>
        </>
    )
}