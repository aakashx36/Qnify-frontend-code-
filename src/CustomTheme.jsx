// src/theme.js
import { createTheme } from '@mui/material/styles';

const CustomTheme = createTheme({
  palette: {
    primary: {
      main: '#4f46e5', // A nice indigo color
    },
    secondary: {
      main: '#c3cfe2',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    h1: { fontWeight: 800 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    button: {
        textTransform: 'none',
        fontWeight: 600
    }
  },
})
export default CustomTheme;
