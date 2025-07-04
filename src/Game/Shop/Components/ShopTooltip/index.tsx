import { Box, Chip, Typography } from '@mui/material';
import useStyle from './style';
import GrainsIndicator from '../../../Components/GrainsIndicator';

interface ShopTooltipProps {
  shopItem: ShopItem;
  icon: string;
  gps: number;
  amount: number;
  disabled: boolean;
}

export default function ShopTooltip({
  shopItem,
  icon,
  gps,
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
          sx={{
            height: 'auto',
            '& .MuiChip-label': {
              display: 'block',
              whiteSpace: 'normal',
            },
          }}
          variant="outlined"
          size="small"
          label={shopItem.description}
        />
        <Chip
          sx={{
            height: 'auto',
            '& .MuiChip-label': {
              display: 'block',
              whiteSpace: 'normal',
            },
          }}
          variant="outlined"
          size="small"
          label={'Produces ' + gps + ' grains per second'}
        />
      </Box>
    </Box>
  );
}
