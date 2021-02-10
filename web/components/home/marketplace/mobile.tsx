import Typography from '@material-ui/core/Typography'

import Carousel from 'react-material-ui-carousel'
import FeaturedCard from '../../card/featured-card'

import styles from './mobile.module.scss'

import { ReactElement } from 'react'

export default function MarketplaceSection(): ReactElement {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.title}>
          <Typography variant="h4" component="h2">
            Start your own collection
          </Typography>
        </div>
        <div className={styles.subtitle}>
          <Typography variant="subtitle2" color="textSecondary">
            In CryptoDragons you can collect Dragons of all colours and shapes. Create Collections
            of your favourite dragons and share them with our cryptodragons community.
          </Typography>
        </div>
        <div className={styles.marketplaceCollections}>
          <Carousel animation="slide">
            <FeaturedCard />
            <FeaturedCard />
            <FeaturedCard />
            <FeaturedCard />
          </Carousel>
        </div>
      </div>
    </div>
  )
}
