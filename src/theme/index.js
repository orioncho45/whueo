import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#53753fff',
      
    },
    text: {
        primary: "#fff"
    },
    brand: {
        dark: "#111911",
        light: "#1f3729",
        boxLight: "#23382cff",
        border: "#4e6457ff",
        white: "#fff"
    }
    // ...add other palette colors if needed...
  },
  components: {
    MuiSelect: {
      styleOverrides: {
        root: {
          color: 'green',
          fontSize: '16px',
          '& .MuiSelect-select': {
            color: 'white',
            paddingRight: '32px',
          },
          '& .MuiSvgIcon-root': {
            color: 'green',
          },
        },
        outlined: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255,255,255,0.4)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'green',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'green',
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1e1e1e', // Give the dropdown panel a dark background
          color: 'white',             // Default text color for the dropdown options
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: 'white',
          '&.Mui-focused': {
            color: 'white',
          },
        },
      },
    },
  },
  // ...add other theme properties if needed...
});

export default theme;
