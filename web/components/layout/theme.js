import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ecfcff',
    },
    secondary: {
      main: '#5edfff',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#b2fcff',
    },
  },
})

export default theme
