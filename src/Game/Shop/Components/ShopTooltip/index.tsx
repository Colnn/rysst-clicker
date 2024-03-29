import { Box, Chip, Typography } from '@mui/material';
import useStyle from './style';
import GrainsIndicator from '../../../Components/GrainsIndicator';

interface ShopTooltipProps {
  name: string;
  icon: string;
  amount: number;
  price: number;
  disabled: boolean;
  gps: number;
}

export default function ShopTooltip({
  name,
  icon,
  amount,
  price,
  disabled,
  gps,
}: ShopTooltipProps) {
  const classes = useStyle();

  return (
    <Box className={classes.container}>
      <Box className={classes.topContainer}>
        <Box className={classes.top}>
          <Box component={'img'} src={icon} className={classes.icon} />
          <Box className={classes.partContainer}>
            <Typography>{name}</Typography>
            <Box className={classes.statContainer}>
              <Chip size={'small'} label={'Owned: ' + amount} />
            </Box>
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
        <Chip
          variant="outlined"
          size="small"
          label={'Produces ' + gps + ' grains per second'}
        />
      </Box>
    </Box>
  );
}
