import { makeStyles } from '@mui/styles';

export default makeStyles(() => {

  return {
    container: {
      width: '100%',
      height: '100%',
      backgroundColor: '#00ff26',
      padding: '0px 10px',
    },
    header: {
      width: '100%',
      height: '5%',
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    upgradesContainer: {
      height: '85px',
      overflowY: 'hidden',
      display: 'flex',
      alignContent: 'start',
      flexWrap: 'wrap',
      transition: 'height 1s',
      '&:hover': {
        height: '255px',
      },
    }
  };
});