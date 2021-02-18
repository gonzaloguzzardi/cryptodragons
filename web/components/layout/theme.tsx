import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
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
      secondary: '#828282',
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
      fontSize: 16,
    },
    body1: {},
    body2: {},
    caption: {
      fontWeight: 600,
    },
    overline: {
      fontSize: 14,
      fontWeight: 600,
      textTransform: 'none',
    },
  },
})
