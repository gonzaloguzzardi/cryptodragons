import { ReactElement } from 'react'

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import { Theme } from '@mui/material/styles'
import { createStyles, makeStyles } from '@mui/styles'

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
        <img src={'/assets/chrome.svg'} alt="" width="160" height="160" />
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
