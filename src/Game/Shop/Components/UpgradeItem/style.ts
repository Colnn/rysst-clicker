import { makeStyles } from '@mui/styles';

export default makeStyles(() => {
  return {
    container: {
      width: '75px',
      height: '75px',
      backgroundImage: 'url("/upgrade-background.png")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      imageRendering: 'pixelated',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
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
      width: '90%',
      imageRendering: 'pixelated',
    },
    disabled: {
      width: '75px',
      height: '75px',
      backgroundImage: 'url("/upgrade-background.png")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      imageRendering: 'pixelated',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      userSelect: 'none',
      margin: '5px',
      '&:hover #popup': {
        display: 'block',
      },
    },
  };
});
