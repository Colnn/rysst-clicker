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
      border: '1px solid transparent',
      padding: '0.6em 1.2em',
      fontSize: '1em',
      fontWeight: 500,
      fontFamily: 'inherit',
      cursor: 'pointer',
      transition: 'borderColor 0.25s',
      width: '35vh',
      height: '35vh',
      backgroundColor: '#fff',
      borderRadius: '10px',
    }
  };
});