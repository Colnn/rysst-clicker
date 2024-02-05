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

interface UpgradeItem {
    id: number,
    name: string,
    unlocked: boolean,
    price: number,
  }

interface ShopProps {
    grains: number,
    shopData: ShopItem[],
    upgradeData: UpgradeItem[],
    handleShopBuy: (id: number) => void,
    handleUpgradeBuy: (id: number) => void,
}

export default function Shop({ grains, shopData, upgradeData, handleShopBuy, handleUpgradeBuy }: ShopProps) {
    const classes = useStyle();

    return (
        <>
            <Grid container direction={"column"} className={classes.container}>
                <Box className={classes.header}>
                    <Typography variant="h4">Shop</Typography>
                </Box>
                <Box className={classes.upgradesContainer}>
                    {/* Upgrades here */}
                    {upgradeData.map(upgrade => {
                        if(!upgrade.unlocked) return (
                            <UpgradeItem id={upgrade.id} name={upgrade.name} icon={"/" + upgrade.name.toLowerCase().replace(" ", "_") + ".svg"} price={upgrade.price.toString()} handleClick={handleUpgradeBuy} disabled={upgrade.price > grains}/>
                        )
                    })}
                </Box>
                <Box>
                    {/* Shop options here */}
                    {shopData.map(item => {
                        return (
                            <ShopItem id={item.id} name={item.name} icon={"/" + item.name.toLowerCase().replace(" ", "_") + ".svg"} price={item.price.toFixed()} handleClick={handleShopBuy} disabled={item.price > grains}/>
                        )
                    })}
                </Box>
            </Grid>
        </>
    )
}