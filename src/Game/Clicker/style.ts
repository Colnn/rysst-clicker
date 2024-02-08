import { makeStyles } from '@mui/styles';

export default makeStyles(() => {
  return {
    container: {
      width: '100%',
      height: '100%',
      backgroundColor: '#6f00ff',
    },
    riceContainer: {
      width: '100%',
      height: '65%',
    },
    rice: {
      fontSize: '1em',
      fontWeight: 500,
      fontFamily: 'inherit',
      cursor: 'pointer',
      width: '50%',
      outline: 0,
      border: 0,
    },
  };
});
