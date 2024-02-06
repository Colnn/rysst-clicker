import { makeStyles } from '@mui/styles';

export default makeStyles(() => {

  return {
    container: {
      padding: '0px 10px',
      width: '100%',
      height: '75px',
      backgroundColor: '#bababa',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: '10px',
      cursor: 'pointer',
      userSelect: 'none',
      margin: '5px 0px',
    },
    partContainer: {
      width: '80%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
    },
    icon: {
        height: '70%',
    },
    priceGreen: {
      color: '#20e302',
    },
    priceRed: {
      color: '#e3023e',
    },
    disabled: {
      padding: '0px 10px',
      width: '100%',
      height: '75px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: '10px',
      userSelect: 'none',
      margin: '5px 0px',
      backgroundColor: '#818181',
    }
  };
});