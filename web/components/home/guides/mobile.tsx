import Link from 'next/link'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import styles from './mobile.module.scss'

import { ReactElement } from 'react'

export default function MarketplaceSection(): ReactElement {
  return (
    <div className={styles.main}>
      <Card className={styles.card} raised>
        <Grid container justifyContent="center">
          <Grid container>
            <img
              className={styles.img}
              alt="complex"
              src="/assets/home/wise-dragon.jpg"
            />
          </Grid>
          <Typography variant="h5" component="h3" gutterBottom align="center">
            Learn how to play!
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" gutterBottom align="center">
            Check the guides and become an expert of Cryptodragons - It is free. Review
            the main features features such as purchasing a dragon, train them and
            everything you must know to start your journey in this magic world.
          </Typography>
          <Link href="/guides">
            <Button
              variant="contained"
              size="large"
              color="secondary"
              className={styles.guideButton}
            >
              <Typography variant="body1" component="span">
                Getting Started
              </Typography>
            </Button>
          </Link>
          <Link href="/guides">
            <Button
              variant="contained"
              size="large"
              color="secondary"
              className={styles.guideButton}
            >
              <Typography variant="body1" component="span">
                Gas and Fees
              </Typography>
            </Button>
          </Link>
          <Link href="/guides">
            <Button
              variant="contained"
              size="large"
              color="secondary"
              className={styles.guideButton}
            >
              <Typography variant="body1" component="span">
                Marketplace
              </Typography>
            </Button>
          </Link>
          <Link href="/guides">
            <Button
              variant="contained"
              size="large"
              color="secondary"
              className={styles.guideButton}
            >
              <Typography variant="body1" component="span">
                FAQs
              </Typography>
            </Button>
          </Link>
        </Grid>
      </Card>
    </div>
  )
}
