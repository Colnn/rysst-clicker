import { makeStyles } from '@mui/styles';

export default makeStyles(() => {

  return {
    container: {
      padding: '0px 10px',
      width: '75px',
      height: '75px',
      backgroundColor: '#bababa',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: '10px',
      cursor: 'pointer',
      userSelect: 'none',
      margin: '5px 0px',
      '&:hover #popup': {
        display: 'block',
      }
    },
    partContainer: {
      width: '80%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
    },
    popup: {
      // display: 'none',

    },
    price: {
      color: '#20e302',
    }
  };
});