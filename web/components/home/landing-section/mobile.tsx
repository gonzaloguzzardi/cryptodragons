import { ReactElement } from 'react'

import { Parallax } from 'react-parallax'
import Typography from '@material-ui/core/Typography'

import styles from './mobile.module.scss'

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
            <Typography variant="h4" component="h2">
              CryptoDragons
            </Typography>
          </div>
          <div className={styles.images}>
            <img src="/assets/home/dragon-1.png" alt="" width="300px" height="300px" />
          </div>
      </Parallax>
    </div>
  )
}
