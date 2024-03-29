import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { ContextProvider } from './hooks/useStateContext';
import {teal, purple } from '@mui/material/colors';

//Material UI Dark Theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: teal[500],
    },
    secondary: {
      main: purple[500],
    },
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
      <ContextProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline/>
            <App />
        </ThemeProvider>
      </ContextProvider>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
