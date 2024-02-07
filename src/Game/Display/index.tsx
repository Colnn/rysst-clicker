import { Box } from "@mui/material";
import useStyle from './style'
import MotivationalTexts from "../Components/motivationalTexts";
import ShopObjectDisplay from "../Components/ShopObjectDisplay";
import { useEffect, useState } from "react";
import { defaultShopItems } from "..";

interface ShopItem {
    id: number,
    name: string,
    amount: number,
    price: number,
  }

interface DisplayProps {
    shopData: ShopItem[],
}

export default function Display({shopData}: DisplayProps) {
    const classes = useStyle();

    const renderDisplayObject = () => {
        const newDisplayObjects = shopData.map(item => (
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
            </Box>
        </>
    )
}