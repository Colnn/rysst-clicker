import RoutesProvider from './routes';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

function App() {
  const theme = createTheme({
  typography: {
    fontFamily: [
      'Pixeloid',
      'serif',
    ].join(','),
  },});
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RoutesProvider />
      </ThemeProvider>
    </>
  );
}

export default App;
