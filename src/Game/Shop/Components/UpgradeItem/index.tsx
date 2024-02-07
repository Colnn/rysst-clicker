import { Box, Tooltip, TooltipProps, styled, tooltipClasses } from "@mui/material";
import useStyle from './style'
import UpgradeTooltip from "../UpgradeTooltip";

interface UpgradeItemProps {
    id: number
    name: string
    icon: string
    price: number
    handleClick: (id: number) => void
    disabled: boolean
}

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: theme.typography.pxToRem(12),
    },
  }));

export default function UpgradeItem({ id, name, icon, price, handleClick, disabled }: UpgradeItemProps) {
    const classes = useStyle();

    const onClick = () => {
        if(!disabled) handleClick(id);
    }

    return (
        <>
            <HtmlTooltip title={
                    <UpgradeTooltip name={name} icon={icon} price={price} disabled={disabled}/>
                } 
                placement="left"
                slotProps={{
                    popper: {
                        modifiers: [
                            {
                                name: 'offset',
                                options: {
                                    offset: [0, -4],
                                }
                            }
                        ]
                    }
                }}
            >
                <Box className={disabled ? classes.disabled : classes.container} onClick={onClick}>
                    <Box component={"img"} src={ icon } draggable={false}/>
                </Box>
            </HtmlTooltip>
        </>
    )
}