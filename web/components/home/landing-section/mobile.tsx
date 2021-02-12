import Typography from '@material-ui/core/Typography'

import { ReactElement } from 'react'

import styles from './mobile.module.scss'
import { Parallax } from 'react-parallax'

export default function LandingSection(): ReactElement {
  return (
    <Parallax
      blur={0}
      bgImage="/assets/home/background_dragon-land.jpg"
      bgImageAlt="background landing"
      strength={100}
    >
      <div className={styles.main}>
        <div className={styles.title}>
          <Typography variant="h4" component="h2">
            CryptoDragons
          </Typography>
        </div>
        <div className={styles.images}>
          <img src="/assets/home/dragon-1.png" alt="" width="300px" height="300px" />
        </div>
      </div>
    </Parallax>
  )
}
