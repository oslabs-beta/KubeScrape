/**
 * ************************************
 *
 * @module  theme.js
 * @description creates MUI theme that can be applied across components

 *
 * ************************************
 */

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { 
      main: '#25274D'
    },
    secondary: { 
      main: '#464866' 
    },
    text: {
      primary: '#fff'
    },
    background: {
      default: '#202129',
      paper: '#25274D',
    },
  },
});

export default theme;
