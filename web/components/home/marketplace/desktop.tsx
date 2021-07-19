import Link from 'next/link'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import FeaturedCard from '../../card/featured-card'

import mock from './dragons-data'

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
            {mock.map((data) => (
              <Grid key={data.image} container item justify="center" xs={12} sm={6} md={3}>
                <FeaturedCard image={data.image} name={data.name} owner={data.owner} />
              </Grid>
            ))}
          </Grid>
        </div>
        <Link href="/marketplace">
          <Button
            variant="contained"
            size="large"
            color="secondary"
            className={styles.goMktpButton}
          >
            <Typography variant="body1" component="span">
              Search more in marketplace!
            </Typography>
          </Button>
        </Link>
      </div>
    </div>
  )
}
