import { makeStyles } from '@mui/styles';

export default makeStyles(() => {
  return {
    container: {
      width: '100%',
      height: 200,
    },
    canvas: {
      imageRendering: 'pixelated',
    },
    object: {
      height: 70,
      width: 70,
    },
  };
});
