import Typography from '@material-ui/core/Typography'

import Grid from '@material-ui/core/Grid'
import FeaturedCard from '../../card/featured-card'

import styles from './desktop.module.scss'

import { ReactElement } from 'react'

export default function MarketplaceSection(): ReactElement {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.title}>
          <Typography variant="h3">Start your own collection</Typography>
        </div>
        <div className={styles.subtitle}>
          <Typography variant="subtitle1" color="textSecondary">
            In CryptoDragons you can collect Dragons of all colours and shapes. Create Collections
            of your favourite dragons and share them with our cryptodragons community.
          </Typography>
        </div>
        <div className={styles.marketplaceCollections}>
          <Grid container justify="space-between">
            <Grid container item justify="center" xs={12} sm={6} md={3}>
              <FeaturedCard />
            </Grid>
            <Grid container item justify="center" xs={12} sm={6} md={3}>
              <FeaturedCard />
            </Grid>
            <Grid container item justify="center" xs={12} sm={6} md={3}>
              <FeaturedCard />
            </Grid>
            <Grid container item justify="center" xs={12} sm={6} md={3}>
              <FeaturedCard />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  )
}
