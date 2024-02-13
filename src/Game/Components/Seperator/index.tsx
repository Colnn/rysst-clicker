import { Box } from '@mui/material';
import useStyle from './style';

export type SeperatorType =
    | 'vertical'
    | 'horizontal';

interface SeperatorProps {
  direction: SeperatorType | 'vertical',
}

export default function Seperator({direction}: SeperatorProps) {
  const classes = useStyle();

  return (
    <>
      <Box className={classes.container + ' ' + (direction == 'vertical' ? classes.vertical : classes.horizontal)}/>
    </>
  );
}
