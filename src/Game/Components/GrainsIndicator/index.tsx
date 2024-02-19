import { Box, Grid, Typography } from '@mui/material';
import useStyle from './style';
import prettyNumber from '../../../prettyNumber';

export type GrainsIndicatorType = 'priceGreen' | 'priceRed' | 'default';

export type GrainsIndicatorSize = 'small' | 'big';

interface GrainsIndicatorProps {
  variant: GrainsIndicatorType | 'default';
  value: number;
  precision: number;
}

export default function GrainsIndicator({
  variant,
  value,
  precision,
}: GrainsIndicatorProps) {
  const classes = useStyle();
  const getIndicatorClass = () => {
    switch (variant) {
      case 'priceGreen':
        return classes.priceGreen;
      case 'priceRed':
        return classes.priceRed;
      default:
        return classes.priceDefault;
    }
  };

  return (
    <Grid container direction={'row'} alignItems={'center'} wrap={'nowrap'}>
      <Box component={'img'} draggable={false} src="/rice.png" />
      <Typography
        variant={value >= 1e6 ? 'caption' : 'h6'}
        className={getIndicatorClass()}
      >
        {prettyNumber(value, precision)}
      </Typography>
    </Grid>
  );
}
