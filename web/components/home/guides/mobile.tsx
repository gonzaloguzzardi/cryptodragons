import Link from 'next/link'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import styles from './mobile.module.scss'

import { ReactElement } from 'react'

export default function MarketplaceSection(): ReactElement {
  return (
    <div className={styles.main}>
      <Card className={styles.card} raised>
        <Grid container justify="center" spacing={4}>
          <Grid item xs={10}>
            <img
              className={styles.img}
              alt="complex"
              src="/assets/home/wise-dragon.jpg"
              width="100px"
            />
            <div className={styles.title}>
              <Typography variant="h5" component="h3" gutterBottom>
                Learn how to play CryptoDragons!
              </Typography>
            </div>
            <div className={styles.subtitle}>
              <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                Check the guides and become an expert of Cryptodragons - It is free. <br /> Review
                the main features features such as purchasing a dragon, train them <br /> and
                everything you must know to start journey in this magic world.
              </Typography>
            </div>
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
        </Grid>
      </Card>
    </div>
  )
}
