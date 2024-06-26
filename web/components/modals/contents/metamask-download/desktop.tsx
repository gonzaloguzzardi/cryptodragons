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

export default function MetamaskContentDesktop(): ReactElement {
  const classes = useStyles()
  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid container item>
        <Typography variant="subtitle2" color="textSecondary">
          You&apos;ll need a safe place to store your criptodragons
        </Typography>
      </Grid>

      <Grid container item justify="center">
        <img src={'/assets/metamask-fox.svg'} alt="" width="200" height="200" />
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
          onClick={() =>
            window.open(
              'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'
            )
          }
        >
          Get from Chrome Web Store
        </Button>
      </Grid>
    </Grid>
  )
}
