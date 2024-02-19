import { Box, Chip, Typography } from '@mui/material';
import useStyle from './style';
import GrainsIndicator from '../../../Components/GrainsIndicator';

interface ShopTooltipProps {
  shopItem: ShopItem;
  icon: string;
  amount: number;
  disabled: boolean;
}

export default function ShopTooltip({
  shopItem,
  icon,
  amount,
  disabled,
}: ShopTooltipProps) {
  const classes = useStyle();

  return (
    <Box className={classes.container}>
      <Box className={classes.topContainer}>
        <Box className={classes.top}>
          <Box component={'img'} src={icon} className={classes.icon} />
          <Box className={classes.partContainer}>
            <Typography>{shopItem.name}</Typography>
            <Box className={classes.statContainer}>
              <Chip size={'small'} label={'Owned: ' + amount} />
            </Box>
          </Box>
        </Box>
        <Box>
          <GrainsIndicator
            variant={disabled ? 'priceRed' : 'priceGreen'}
            value={shopItem.price}
            precision={3}
          />
        </Box>
      </Box>
      <Box className={classes.bottomContainer}>
        <Chip
          variant="outlined"
          size="small"
          label={'Produces ' + shopItem.gps + ' grains per second'}
        />
      </Box>
    </Box>
  );
}
