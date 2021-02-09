import Typography from '@material-ui/core/Typography'

import { ReactElement } from 'react'

import styles from './desktop.module.scss'

import MarketplaceCollections from '../../card/cards-stacked/desktop'

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
          <MarketplaceCollections />
        </div>
      </div>
    </div>
  )
}
