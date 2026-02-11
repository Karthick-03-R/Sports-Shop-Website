import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import App from './App';
import { CartProvider } from './context/CartContext';
import './index.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0f4c81',
    },
    secondary: {
      main: '#f57c00',
    },
    background: {
      default: '#f4f6f8',
    },
  },
  shape: {
    borderRadius: 12,
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </ThemeProvider>
);
