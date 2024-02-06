import { Box, Typography } from "@mui/material";
import useStyle from './style'

interface UpgradeItemProps {
    id: number
    name: string
    icon: string
    price: number
    handleClick: (id: number) => void
    disabled: boolean
}

export default function UpgradeItem({ id, name, icon, price, handleClick, disabled }: UpgradeItemProps) {
    const classes = useStyle();

    const onClick = () => {
        if(!disabled) handleClick(id);
    }

    return (
        <>
            <Box className={disabled ? classes.disabled : classes.container} onClick={onClick}>
                <Box component={"img"} src={ icon } draggable={false}/>
            </Box>
        </>
    )
}