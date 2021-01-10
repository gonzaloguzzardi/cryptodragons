import Typography from '@material-ui/core/Typography'

import { ReactElement } from 'react'

import styles from './index.module.scss'

export default function LandingSection(): ReactElement {
  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <Typography variant="h2">CryptoDragons</Typography>
      </div>
      <div className={styles.images}>
        <img src="/assets/home/dragon-1.png" alt="" />
      </div>
    </div>
  )
}
