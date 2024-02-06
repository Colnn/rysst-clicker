import { Grid, ToggleButton, ToggleButtonGroup } from "@mui/material";
import useStyle from './style'

interface SettingsBarProps {
    action: boolean,
    setAction: (sell: boolean) => void,
    buyAmount: number,
    setBuyAmount: (amount: number) => void,
}

export default function SettingsBar({ action, setAction, buyAmount, setBuyAmount }: SettingsBarProps) {
    const classes = useStyle();

    const handleAction = (
        event: React.MouseEvent<HTMLElement>,
        action: boolean,
      ) => {
        setAction(action);
      };

      const handleAmount = (
        event: React.MouseEvent<HTMLElement>,
        amount: number,
      ) => {
        setBuyAmount(amount);
      };

    return (
        <>
            <Grid container className={classes.container}>
                <ToggleButtonGroup
                    value={action}
                    exclusive
                    onChange={handleAction}
                    orientation="vertical"
                >
                    <ToggleButton value={false} size="small">
                        Buy
                    </ToggleButton>
                    <ToggleButton value={true} size="small">
                        Sell
                    </ToggleButton>
                </ToggleButtonGroup>
                <ToggleButtonGroup
                    value={buyAmount}
                    exclusive
                    onChange={handleAmount}
                >
                    <ToggleButton value={1} size="small">
                        1
                    </ToggleButton>
                    <ToggleButton value={10} size="small">
                        10
                    </ToggleButton>
                    <ToggleButton value={100} size="small">
                        100
                    </ToggleButton>
                </ToggleButtonGroup>
            </Grid>
        </>
    )
}