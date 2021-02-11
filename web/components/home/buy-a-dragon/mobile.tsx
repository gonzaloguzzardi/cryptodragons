import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'

import { ReactElement } from 'react'

import styles from './mobile.module.scss'

export default function BuyADragonSection(): ReactElement {
  return (
    <div className={styles.main}>
      <Card className={styles.card} raised>
        <Grid container justify="center" spacing={4}>
          <img className={styles.img} alt="complex" src="/assets/home/dragon-2.png" />
          <Grid item xs={10}>
            <Typography variant="h5" component="h3" gutterBottom>
              What is CryptoDragons?
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              CryptoDragons is a game centered around breedable, collectible, and oh-so-adorable
              creatures we call CryptoDragons! Each dragon is one-of-a-kind and 100% owned by you;
              it cannot be replicated, taken away, or destroyed.
            </Typography>
          </Grid>
          <Grid container justify="center">
            <Grid item xs={6}>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                fullWidth
                endIcon={<img src="/assets/home/dragon-3.png" alt="" height="50px" />}
                className={styles.cardButton}
              >
                <Typography variant="body1" component="span">
                  Buy a Dragon
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </div>
  )
}
