import { ReactElement } from 'react'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
    },
  })
)

export default function DownloadChromeContent(): ReactElement {
  const classes = useStyles()
  return (
    <Grid container spacing={6} className={classes.root} alignItems="stretch">
      <Grid container item>
        <Typography variant="subtitle2" color="textSecondary">
          You can only play CryptoDragons on a browser like Chrome.
        </Typography>
      </Grid>

      <Grid container item justify="center">
        <img src={'/assets/chrome.svg'} alt="" width="200" height="200" />
      </Grid>

      <Grid container item justify="center">
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => window.open('https://www.google.com/intl/es-419/chrome/')}
        >
          Download Chrome
        </Button>
      </Grid>
    </Grid>
  )
}
