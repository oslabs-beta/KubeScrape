/**
 * ************************************
 *
 * @module  theme.js
 * @description creates MUI theme that can be applied across components

 *
 * ************************************
 */

import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: { 
      main: '#25274D'
    },
    secondary: { 
      main: '#464866' 
    },
    background: { 
      default: '#25274D'
    }
  },
});
