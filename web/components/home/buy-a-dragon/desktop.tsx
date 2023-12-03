import Link from 'next/link'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'

import { ReactElement } from 'react'

import styles from './desktop.module.scss'

export default function BuyADragonSection(): ReactElement {
  return (
    <div className={styles.main}>
      <Card className={styles.card} raised>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Grid container justifyContent="center">
              <img className={styles.img} alt="complex" src="/assets/dragon-ai/playa-removebg-preview.png" />
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
                <Link href="/marketplace">
                  <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    fullWidth
                    endIcon={<img src="/assets/dragon-ai/desierto-removebg-preview.png" alt="" height="50px" />}
                    className={styles.cardButton}
                  >
                    <Typography variant="h6" component="span">
                      Buy a Dragon
                    </Typography>
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </div>
  )
}
