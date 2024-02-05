import { Box, Grid, Typography } from "@mui/material";
import useStyle from './style'
import ShopItem from "./Components/ShopItem";
import UpgradeItem from "./Components/UpgradeItem";

interface ShopItem {
    id: number,
    name: string,
    amount: number,
    price: number,
  }

interface ShopProps {
    grains: number,
    shopData: ShopItem[],
    handleBuy: (id: number) => void
}

export default function Shop({ grains, shopData, handleBuy }: ShopProps) {
    const classes = useStyle();

    const handleUpgradeClick = (id: string) => {
        console.log("Upgrade: " + id);
    }

    return (
        <>
            <Grid container direction={"column"} className={classes.container}>
                <Box className={classes.header}>
                    <Typography variant="h4">Shop</Typography>
                </Box>
                <Box className={classes.upgradesContainer}>
                    {/* Upgrades here */}
                    <UpgradeItem name="React Course" icon={"/react.svg"} price="75" handleClick={handleUpgradeClick}/>
                </Box>
                <Box>
                    {/* Shop options here */}
                    {shopData.map(item => {
                        return (
                            <ShopItem id={item.id} name={item.name} icon={"/developer.svg"} price={item.price.toFixed()} handleClick={handleBuy} disabled={item.price > grains}/>
                        )
                    })}
                </Box>
            </Grid>
        </>
    )
}