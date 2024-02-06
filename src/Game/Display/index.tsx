import { Box } from "@mui/material";
import useStyle from './style'
import MotivationalTexts from "../Components/motivationalTexts";
import ShopObjectDisplay from "../Components/ShopObjectDisplay";
import { useEffect, useState } from "react";
import { defaultShopItems } from "..";

export default function Display() {
    const classes = useStyle();
    const [amount, setAmount] = useState(5);

    const weewoo = () => {
        setAmount(amount + 1);
    }

    const renderDisplayObject = () => {
        const newDisplayObjects = defaultShopItems.map(item => (
            <ShopObjectDisplay
                key={item.name}
                amount={item.amount}
                objectName={item.name}
                backgroundSVG="/rysst_cooker.png"
            />
        ));
    
        return newDisplayObjects;
    }

    return (
        <>
            <Box className={classes.container} >
                <MotivationalTexts />
                {
                    renderDisplayObject()
                }
                <button onClick={weewoo}>click me</button>
            </Box>
        </>
    )
}