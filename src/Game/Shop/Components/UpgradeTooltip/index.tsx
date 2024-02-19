import { Box, Chip, Typography } from '@mui/material';
import useStyle from './style';
import GrainsIndicator from '../../../Components/GrainsIndicator';

interface UpgradeTooltipProps {
  upgrade: UpgradeItem;
  itemName: string;
  icon: string;
  disabled: boolean;
}

export default function UpgradeTooltip({
  upgrade,
  itemName,
  icon,
  disabled,
}: UpgradeTooltipProps) {
  const classes = useStyle();

  const effect = () => {
    switch (upgrade.action) {
      case 'multiplyGPS':
        return 'Your ' + itemName + "s are " + upgrade.value + "times as efficient.";
    }
  };

  return (
    <Box className={classes.container}>
      <Box className={classes.topContainer}>
        <Box className={classes.top}>
          <Box component={'img'} src={icon} className={classes.icon} />
          <Box className={classes.partContainer}>
            <Typography>{upgrade.name}</Typography>
          </Box>
        </Box>
        <Box>
          <GrainsIndicator
            variant={disabled ? 'priceRed' : 'priceGreen'}
            value={upgrade.price}
            precision={3}
          />
        </Box>
      </Box>
      <Box className={classes.bottomContainer}>
        <Chip sx={{
          height: 'auto',
          '& .MuiChip-label': {
            display: 'block',
            whiteSpace: 'normal',
          },
        }} variant="outlined" size="small" label={upgrade.description} />
        <Chip sx={{
          height: 'auto',
          '& .MuiChip-label': {
            display: 'block',
            whiteSpace: 'normal',
          },
        }}  variant="outlined" size="small" label={effect()} />
      </Box>
    </Box>
  );
}
