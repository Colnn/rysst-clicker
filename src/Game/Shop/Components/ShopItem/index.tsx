import { Box, Grid, Typography } from "@mui/material";
import useStyle from './style'
import { prettyNumber } from "@based/pretty-number";

interface ShopItemProps {
    id: number,
    name: string
    icon: string
    price: number
    amount: number
    buyAmount: number
    handleClick: (id: number) => void
    disabled: boolean
}

export default function ShopItem({ id, name, icon, price, amount, buyAmount, handleClick, disabled }: ShopItemProps) {
    const classes = useStyle();

    const onClick = () => {
        if(!disabled) handleClick(id);
    }

    return (
        <>
            <Box className={disabled ? classes.disabled : classes.container} onClick={onClick}>
                <Box className={classes.partContainer}>
                    <Box component={"img"} src={ icon } draggable={false} className={classes.icon}/>
                    <Grid container>
                        <Typography variant="h6">{ name }</Typography>
                        <Grid container direction={"row"} alignItems={'flex-end'}>
                            <Typography className={classes.buyAmount} fontWeight={600}>x{ buyAmount }</Typography>
                            <Typography variant="h6" className={disabled ? classes.priceRed : classes.priceGreen}>{ prettyNumber(price, 'number-short') }</Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Typography fontSize={100} fontWeight={700} lineHeight={1} className={classes.amount}>{ amount }</Typography>
            </Box>
        </>
    )
}