import React from "react"
import { createRoot } from "react-dom/client";
import "leaflet/dist/leaflet.css";
import App from "./App.tsx";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    mode: 'light', // or 'dark'
    primary: {
      main: '#1976d2',
    },
  },
});

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Resets default browser styles */}
        <App />
      </ThemeProvider>
    </React.StrictMode>
  );
