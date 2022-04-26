import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'

import { ReactElement } from 'react'

import styles from './mobile.module.scss'

export default function BuyADragonSection(): ReactElement {
  return (
    <div className={styles.main}>
      <Card className={styles.card} raised>
        <Grid container>
          <Grid container>
            <img className={styles.img} alt="dragon-image" src="/assets/home/dragon-2.png" />
          </Grid>
          <Typography variant="h5" component="h3" gutterBottom>
            What is CryptoDragons?
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" gutterBottom>
            CryptoDragons is a game centered around breedable, collectible, and oh-so-adorable
            creatures we call CryptoDragons! Each dragon is one-of-a-kind and 100% owned by you;
            it cannot be replicated, taken away, or destroyed.
          </Typography>
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
      </Card>
    </div>
  )
}
