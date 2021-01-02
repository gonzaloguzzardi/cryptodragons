import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
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
    },
    error: {
      main: '#f44',
    },
    background: {
      default: '#fff',
    },
  },
})

export default theme
