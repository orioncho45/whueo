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
    },
    // design tokens (moved from landing.jsx)
    t: {
      bg:           "#0c1410",
      surface:      "#161e15",
      surfaceUp:    "#1c2a1a",
      overlay:      "rgba(0,0,0,0.25)",
      border:       "rgba(78,100,87,0.45)",
      borderMid:    "rgba(78,100,87,0.70)",
      borderHi:     "#4e6457",
      borderAccent: "rgba(83,117,63,0.55)",
      textHi:       "#e9efe8",
      textMid:      "rgba(233,239,232,0.60)",
      textLow:      "rgba(233,239,232,0.38)",
      textLowest:   "rgba(233,239,232,0.22)",
      accent:       "#7db87a",
      accentDim:    "rgba(83,117,63,0.12)",
      accentBorder: "rgba(83,117,63,0.35)",
      warm:         "#c8a96e",
      warmDim:      "rgba(200,169,110,0.10)",
      warmBorder:   "rgba(200,169,110,0.28)",
      cool:         "#6e9db8",
      coolDim:      "rgba(110,157,184,0.10)",
      coolBorder:   "rgba(110,157,184,0.25)",
    }
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
