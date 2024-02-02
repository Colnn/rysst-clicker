import { Box } from "@mui/material";
import useStyle from './style'
import MotivationalTexts from "../Components/motivationalTexts";

export default function Display() {
    const classes = useStyle();

    return (
        <>
            <Box className={classes.container} >
                <MotivationalTexts />
            </Box>
        </>
    )
}