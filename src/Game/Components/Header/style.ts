import { makeStyles } from '@mui/styles';

export default makeStyles(() => {
  return {
    container: {
      width: '100%',
      height: '100%',
      backgroundImage: 'url("/header.png")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      imageRendering: 'pixelated',
    },
  };
});
