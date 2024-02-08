import { Box, Chip, Typography } from '@mui/material';
import useStyle from './style';
import prettyNumber from '../../../../prettyNumber';

interface ShopTooltipProps {
  name: string;
  icon: string;
  amount: number;
  price: number;
  disabled: boolean;
}

export default function ShopTooltip({
  name,
  icon,
  amount,
  price,
  disabled,
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
          <Typography
            className={disabled ? classes.priceRed : classes.priceGreen}
          >
            {prettyNumber(price, 3)}
          </Typography>
        </Box>
      </Box>
      <Box className={classes.bottomContainer}>
        <Chip
          variant="outlined"
          size="small"
          label={'Produces ' + 0 + ' grains per second'}
        />
      </Box>
    </Box>
  );
}
