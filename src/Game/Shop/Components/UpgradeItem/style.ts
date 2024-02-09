import { makeStyles } from '@mui/styles';

export default makeStyles(() => {
  return {
    container: {
      width: '75px',
      height: '75px',
      backgroundColor: '#bababa',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: '10px',
      cursor: 'pointer',
      userSelect: 'none',
      margin: '5px',
      '&:hover #popup': {
        display: 'block',
      },
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
    },
    icon: {
      width: '100%',
    },
    disabled: {
      width: '75px',
      height: '75px',
      backgroundColor: '#818181',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: '10px',
      userSelect: 'none',
      margin: '5px',
      '&:hover #popup': {
        display: 'block',
      },
    },
  };
});
