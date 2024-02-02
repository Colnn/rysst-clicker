import { Box } from "@mui/material";
import useStyle from './style'

export default function Header() {
    const classes = useStyle();

    return (
        <>
            <Box className={classes.container}>Header :D</Box>
        </>
    )
}