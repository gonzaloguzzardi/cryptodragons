import { ReactElement } from 'react'

import Link from 'next/link'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import styles from './desktop.module.scss'

export default function MarketplaceSection(): ReactElement {
  return (
    <div className={styles.main}>
      <Card className={styles.card} raised>
        <Grid container>
          <Grid item xs={4}>
            <img
              className={styles.img}
              alt="complex"
              src="/assets/home/wise-dragon.jpg"
              width="200px"
            />
          </Grid>

          <Grid item xs={8} container alignItems="center">
            <div className={styles.title}>
              <Typography variant="h4">Learn how to play CryptoDragons!</Typography>
            </div>

            <div className={styles.subtitle}>
              <Typography variant="subtitle1" color="textSecondary">
                Check the guides and become an expert of Cryptodragons - It is free. Review the main
                features features such as purchasing a dragon, train them and everything you must
                know to start your journey in this magic world.
              </Typography>
            </div>

            <Grid container justifyContent="center" spacing={2}>
              <Grid item>
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
              </Grid>

              <Grid item>
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
              </Grid>

              <Grid item>
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
              </Grid>

              <Grid item>
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
          </Grid>
        </Grid>
      </Card>
    </div>
  )
}
