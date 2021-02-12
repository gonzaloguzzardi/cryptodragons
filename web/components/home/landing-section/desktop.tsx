import { Parallax } from 'react-parallax'
import Typography from '@material-ui/core/Typography'

import { ReactElement } from 'react'

import styles from './desktop.module.scss'

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
          <Typography variant="h2">CryptoDragons</Typography>
        </div>
        <div className={styles.images}>
          <img src="/assets/home/dragon-1.png" alt="" width="400px" height="400px" />
        </div>
      </div>
    </Parallax>
  )
}
