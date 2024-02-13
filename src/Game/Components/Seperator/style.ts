import { makeStyles } from '@mui/styles';

export default makeStyles(() => {
  return {
    container: {
      width: '20px',
      height: '100%',
      backgroundImage: 'url("/seperator.png")',
      backgroundSize: 'contain',
      imageRendering: 'pixelated',
    },
  };
});