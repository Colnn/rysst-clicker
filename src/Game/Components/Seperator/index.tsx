import { Box } from '@mui/material';
import useStyle from './style';

export default function Seperator() {
  const classes = useStyle();

  return (
    <>
      <Box className={classes.container}/>
    </>
  );
}
