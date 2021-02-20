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

export default function MetamaskContentMobile(): ReactElement {
  const classes = useStyles()
  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid container item>
        <Typography variant="subtitle2" color="textSecondary">
          You&apos;ll need a safe place to store your criptodragons
        </Typography>
      </Grid>

      <Grid container item justify="center">
        <img src={'/assets/metamask-fox.svg'} alt="" width="150" height="150" />
      </Grid>

      <Grid container item>
        <Typography variant="body1" color="textSecondary" align="center">
          The perfect place is in a secure wallet like Metamask. This will also act as your login to
          the game (no extra password needed).
        </Typography>
      </Grid>

      <Grid container item justify="center">
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => window.open('https://play.google.com/store/apps/details?id=io.metamask')}
        >
          Get from Google Play
        </Button>
      </Grid>
    </Grid>
  )
}
