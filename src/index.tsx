import { createRoot } from 'react-dom/client'
import App from './App/index.tsx'
import './index.css'
import { SnackbarProvider } from 'notistack';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <SnackbarProvider 
        maxSnack={5} 
        preventDuplicate
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
    >
        <App />
    </SnackbarProvider>
);