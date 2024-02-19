import { makeStyles } from '@mui/styles';

export default makeStyles(() => {
  return {
    container: {
      width: '100%',
      backgroundImage: 'url("/settingsbar-background.png")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      imageRendering: 'pixelated',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      cursor: 'pointer',
      userSelect: 'none',
      margin: '5px 0px',
    },
    actionSelect: {
      display: 'flex',
      direction: 'row',
    },
  };
});
