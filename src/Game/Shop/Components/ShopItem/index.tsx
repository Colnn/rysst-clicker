import { Box, Typography } from "@mui/material";
import useStyle from './style'

interface ShopItemProps {
    id: number,
    name: string
    icon: string
    price: string
    handleClick: (id: number) => void
    disabled: boolean
}

export default function ShopItem({ id, name, icon, price, handleClick, disabled }: ShopItemProps) {
    const classes = useStyle();

    const onClick = () => {
        if(!disabled) handleClick(id);
    }

    return (
        <>
            <Box className={disabled ? classes.disabled : classes.container} onClick={onClick}>
                <Box className={classes.partContainer}>
                    <Box component={"img"} src={ icon } draggable={false} className={classes.icon}/>
                    <Typography variant="h6">{ name }</Typography>
                </Box>
                <Typography variant="h6" className={disabled ? classes.priceRed : classes.priceGreen}>{ price }</Typography>
            </Box>
        </>
    )
}