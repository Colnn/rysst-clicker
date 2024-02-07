import { makeStyles } from '@mui/styles';

export default makeStyles(() => {

  return {
    container: {
      padding: '0px 10px',
      width: '300px',
      height: '100px',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      flexDirection: 'column',
      borderRadius: '10px',
      cursor: 'pointer',
      userSelect: 'none',
      margin: '5px 0px',
    },
    topContainer: {
        display: 'flex',
        height: '50%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    top: {
        display: 'flex',
        flexDirection: 'row',
    },
    bottomContainer: {
        display: 'flex',
        height: '50%',
        width: '80%',
        flexDirection: 'column',
        paddingTop: '5px',
    },
    partContainer: {
      width: '80%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      textAlign: 'left',
      alignItems: 'center',
    },
    statContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        height: '100%',
        marginRight: '10px',
    },
    priceGreen: {
      color: '#20e302',
    },
    priceRed: {
      color: '#e3023e',
    },
    buyAmount: {
      color: '#fffffe',
    },
    disabled: {
      padding: '0px 10px',
      width: '100%',
      height: '75px',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      borderRadius: '10px',
      cursor: 'pointer',
      userSelect: 'none',
      margin: '5px 0px',
      backgroundColor: '#818181',
    },
    amount: {
      width: '20%',
      height: '100%',
      overflow: 'hidden',
      opacity: '50%',
    },
  };
});