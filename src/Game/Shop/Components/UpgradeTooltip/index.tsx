import { Box, Chip, Typography } from '@mui/material';
import useStyle from './style';
import GrainsIndicator from '../../../Components/GrainsIndicator';

interface UpgradeTooltipProps {
  name: string;
  icon: string;
  price: number;
  disabled: boolean;
  itemName: string;
  action: string;
  description: string;
}

export default function UpgradeTooltip({
  name,
  icon,
  price,
  disabled,
  itemName,
  action,
  description,
}: UpgradeTooltipProps) {
  const classes = useStyle();

  const effect = () => {
    switch (action) {
      case 'multiplyGPS':
        return 'Your ' + itemName + "'s are twice as efficient.";
        break;
    }
  };

  return (
    <Box className={classes.container}>
      <Box className={classes.topContainer}>
        <Box className={classes.top}>
          <Box component={'img'} src={icon} className={classes.icon} />
          <Box className={classes.partContainer}>
            <Typography>{name}</Typography>
          </Box>
        </Box>
        <Box>
          <GrainsIndicator
            variant={disabled ? 'priceRed' : 'priceGreen'}
            value={price}
            precision={3}
          />
        </Box>
      </Box>
      <Box className={classes.bottomContainer}>
        <Chip variant="outlined" size="small" label={description} />
        <Chip variant="outlined" size="small" label={effect()} />
      </Box>
    </Box>
  );
}
