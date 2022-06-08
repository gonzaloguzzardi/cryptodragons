import Typography from '@mui/material/Typography'

import { ReactElement } from 'react'

import styles from './desktop.module.scss'

export default function LandingSection(): ReactElement {
  return (
    <div className={styles.landingImage}>
      <div className={styles.main}>
        <div className={styles.title}>
          <Typography variant="h2">CryptoDragons</Typography>
        </div>
        <div className={styles.images}>
          <img src="/assets/home/dragon-1.png" alt="" width="400px" height="400px" />
        </div>
      </div>
    </div>
  )
}
