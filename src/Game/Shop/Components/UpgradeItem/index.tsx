import { Box, Typography } from "@mui/material";
import useStyle from './style'

interface UpgradeItemProps {
    name: string
    icon: string
    price: string
    handleClick: (id: string) => void
}

export default function UpgradeItem({ name, icon, price, handleClick }: UpgradeItemProps) {
    const classes = useStyle();

    const onClick = () => {
        handleClick(name.toLowerCase());
    }

    return (
        <>
            <Box className={classes.container} onClick={onClick}>
                <Box component={"img"} src={ icon } draggable={false}/>
            </Box>
        </>
    )
}