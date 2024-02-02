import { Box, Typography } from "@mui/material";
import useStyle from './style'

interface ShopItemProps {
    name: string
    icon: string
    price: string
    handleClick: (id: string) => void
}

export default function ShopItem({ name, icon, price, handleClick }: ShopItemProps) {
    const classes = useStyle();

    const onClick = () => {
        handleClick(name.toLowerCase());
    }

    return (
        <>
            <Box className={classes.container} onClick={onClick}>
                <Box className={classes.partContainer}>
                    <Box component={"img"} src={ icon } draggable={false} className={classes.icon}/>
                    <Typography variant="h6">{ name }</Typography>
                </Box>
                <Typography variant="h6" className={classes.price}>{ price }</Typography>
            </Box>
        </>
    )
}