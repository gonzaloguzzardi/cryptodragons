import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'

import { ReactElement } from 'react'

import styles from './desktop.module.scss'

export default function BuyADragonSection(): ReactElement {
  return (
    <div className={styles.main}>
      <Card className={styles.card} raised>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Grid container justify="center">
              <img className={styles.img} alt="complex" src="/assets/home/dragon-2.png" />
            </Grid>
          </Grid>
          <Grid item xs={8} container alignItems="center">
            <Grid item xs={10}>
              <Typography variant="h3" gutterBottom>
                What is CryptoDragons?
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                CryptoDragons is a game centered around breedable, collectible, and oh-so-adorable
                creatures we call CryptoDragons! Each dragon is one-of-a-kind and 100% owned by you;
                it cannot be replicated, taken away, or destroyed.
              </Typography>
            </Grid>
            <Grid container>
              <Grid item xs={6}></Grid>
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  fullWidth
                  endIcon={<img src="/assets/home/dragon-3.png" alt="" height="60px" />}
                  className={styles.cardButton}
                >
                  <Typography variant="h6" component="span">
                    Buy a Dragon
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </div>
  )
}
