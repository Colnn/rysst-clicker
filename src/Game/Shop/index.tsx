import { Box, Grid, Typography } from "@mui/material";
import useStyle from './style'
import ShopItem from "./Components/ShopItem";
import UpgradeItem from "./Components/UpgradeItem";

export default function Shop() {
    const classes = useStyle();

    const handleShopClick = (id: string) => {
        console.log("Shop: " + id);
    }

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
                    <ShopItem name="Developer" icon={"/developer.svg"} price="5" handleClick={handleShopClick}/>
                </Box>
            </Grid>
        </>
    )
}