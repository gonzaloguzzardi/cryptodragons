import Link from 'next/link'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

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
        <Link href="/marketplace">
          <Button
            variant="contained"
            size="large"
            color="secondary"
            className={styles.goMktpButton}
          >
            <Typography variant="body1" component="span">
              Search in marketplace!
            </Typography>
          </Button>
        </Link>
      </div>
    </div>
  )
}
