import { Box } from "@mui/material";
import useStyle from './style'
import MotivationalTexts from "../Components/motivationalTexts";
import ShopObjectDisplay from "../Components/ShopObjectDisplay";
import { useState } from "react";

export default function Display() {
    const classes = useStyle();
    const [amount, setAmount] = useState(5);

    const weewoo = () => {
        setAmount(amount + 1);
    }

    return (
        <>
            <Box className={classes.container} >
                <MotivationalTexts />
                <ShopObjectDisplay amount={amount} objectName="Developer" backgroundSVG="/rysst_cooker.png" />
                <button onClick={weewoo}>click me</button>
            </Box>
        </>
    )
}