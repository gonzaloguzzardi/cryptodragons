import { Parallax } from 'react-parallax'
import Typography from '@material-ui/core/Typography'

import { ReactElement } from 'react'

import styles from './desktop.module.scss'

export default function LandingSection(): ReactElement {
  return (
    <div className={styles.main}>
      <Parallax
        blur={1}
        bgImage="/assets/home/background_dragon-land.jpg"
        bgImageAlt="background landing"
        strength={120}
      >
        <div className={styles.title}>
          <Typography variant="h2">CryptoDragons</Typography>
        </div>
        <div className={styles.images}>
          <img src="/assets/home/dragon-1.png" alt="" width="400px" height="400px" />
        </div>
      </Parallax>
    </div>
  )
}
