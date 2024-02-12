import { makeStyles } from '@mui/styles';

export default makeStyles(() => {
  return {
    container: {
      padding: '0px 10px',
      width: '100%',
      height: '75px',
      backgroundImage: 'url("/shopitem-background.png")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      imageRendering: 'pixelated',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
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
      marginRight: '10px',
      imageRendering: 'pixelated',
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
      cursor: 'pointer',
      userSelect: 'none',
      margin: '5px 0px',
      backgroundImage: 'url("/shopitem-background.png")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      imageRendering: 'pixelated',
    },
    amount: {
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      opacity: '50%',
      textAlign: 'right',
    },
  };
});
