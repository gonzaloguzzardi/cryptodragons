import { createTheme } from '@mui/material/styles'

export default createTheme({
  palette: {
    action: {
      active: '#222',
    },
    primary: {
      main: '#fff',
      dark: '#ddd',
      contrastText: '#222',
    },
    secondary: {
      main: '#88f',
      dark: '#55e',
      contrastText: '#fff',
    },
    text: {
      primary: '#222',
      secondary: '#626262',
    },
    error: {
      main: '#f44',
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    fontFamily: 'Raleway, Arial',
    button: {
      fontWeight: 'bold',
      textTransform: 'none',
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: 22,
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: 18,
    },
    body1: {},
    body2: {},
    caption: {
      fontSize: 14,
      fontWeight: 600,
      userSelect: 'none',
    },
    overline: {
      fontSize: 14,
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiMobileStepper: {
      styleOverrides: {
        dotActive: {
          backgroundColor: '#88f'
        }
      }
    }
  }
})
