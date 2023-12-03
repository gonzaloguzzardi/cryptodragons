import Typography from '@mui/material/Typography'

import { ReactElement } from 'react'

import styles from './desktop.module.scss'

export default function LandingSection(): ReactElement {
  return (
    <div className={styles.landingImage}>
      <div className={styles.main}>
        <div className={styles.images}>
          <img src="/assets/dragon-ai/unicorn2-removebg.png" alt="" width="400px" height="400px" />
        </div>
      </div>
    </div>
  )
}
