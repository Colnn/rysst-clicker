import { Grid, ToggleButton, ToggleButtonGroup } from "@mui/material";

interface SettingsBarProps {
    action: boolean,
    setAction: (sell: boolean) => void,
    buyAmount: number,
    setBuyAmount: (amount: number) => void,
}

export default function SettingsBar({ action, setAction, buyAmount, setBuyAmount }: SettingsBarProps) {

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
            <Grid container>
                <ToggleButtonGroup
                    value={action}
                    exclusive
                    onChange={handleAction}
                >
                    <ToggleButton value={false}>
                        Buy
                    </ToggleButton>
                    <ToggleButton value={true}>
                        Sell
                    </ToggleButton>
                </ToggleButtonGroup>
                <ToggleButtonGroup
                    value={buyAmount}
                    exclusive
                    onChange={handleAmount}
                >
                    <ToggleButton value={1}>
                        1
                    </ToggleButton>
                    <ToggleButton value={10}>
                        10
                    </ToggleButton>
                    <ToggleButton value={100}>
                        100
                    </ToggleButton>
                </ToggleButtonGroup>
            </Grid>
        </>
    )
}