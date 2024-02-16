import { makeStyles } from '@mui/styles';

export default makeStyles(() => {
  return {
    container: {
      backgroundSize: 'contain',
      imageRendering: 'pixelated',
    },
    vertical: {
      backgroundImage: 'url("/seperator-vertical.png")',
      width: '20px',
      height: '100%',
    },
    horizontal: {
      backgroundImage: 'url("/seperator-horizontal.png")',
      width: '100%',
      height: '20px',
    },
  };
});
