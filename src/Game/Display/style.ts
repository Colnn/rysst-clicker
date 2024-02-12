import { makeStyles } from '@mui/styles';

export default makeStyles(() => {
  return {
    container: {
      width: '100%',
      height: '100%',
      backgroundColor: '#ff00b3',
    },
    topContainer: {
      width: '100%',
    },
    options: {
      width: '10%',
    },
    statsHeader: {
      width: '100%',
      height: '40px',
      display: 'flex',
      justifyContent: 'start',
      padding: '0px 10px',
      margin: '10px',
      alignItems: 'center',
    },
    upgradeContainer: {
      width: '75px',
      height: '75px',
      margin: '5px',
    },
    icon: {
      width: '100%',
      imageRendering: 'pixelated',
    },
  };
});
