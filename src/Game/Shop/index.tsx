import { Box, Grid, Typography } from "@mui/material";
import useStyle from './style'
import ShopItem from "./Components/ShopItem";
import UpgradeItem from "./Components/UpgradeItem";
import SettingsBar from "./Components/SettingsBar";

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
    shouldSell: boolean,
    setShouldSell: (shouldSell: boolean) => void,
    buyAmount: number,
    setBuyAmount: (buyAmount: number) => void,
}

export default function Shop({ grains, shopData, upgradeData, handleShopBuy, handleUpgradeBuy, shouldSell, setShouldSell, buyAmount, setBuyAmount }: ShopProps) {
    const classes = useStyle();

    return (
        <>
            <Grid container direction={"column"} className={classes.container}>
                <Box className={classes.header}>
                    <Typography variant="h4">Shop</Typography>
                </Box>
                <SettingsBar action={shouldSell} setAction={setShouldSell} buyAmount={buyAmount} setBuyAmount={setBuyAmount}/>
                <Box className={classes.upgradesContainer}>
                    {/* Upgrades here */}
                    {upgradeData.map(upgrade => {
                        for (let index = 0; index < buyAmount; index++) {
                            upgrade.price = Math.round(upgrade.price * 1.15);
                        }
                        if(!upgrade.unlocked) return (
                            <UpgradeItem id={upgrade.id} name={upgrade.name} icon={"/" + upgrade.name.toLowerCase().replace(" ", "_") + ".svg"} price={(upgrade.price * buyAmount).toFixed()} handleClick={handleUpgradeBuy} disabled={(upgrade.price * buyAmount) > grains}/>
                        )
                    })}
                </Box>
                <Box>
                    {/* Shop options here */}
                    {shopData.map(item => {
                        return (
                            <ShopItem id={item.id} name={item.name} icon={"/" + item.name.toLowerCase().replace(" ", "_") + ".svg"} price={(item.price * buyAmount).toFixed()} handleClick={handleShopBuy} disabled={(item.price * buyAmount) > grains}/>
                        )
                    })}
                </Box>
            </Grid>
        </>
    )
}