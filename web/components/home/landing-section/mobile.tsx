import { ReactElement } from 'react'

// @TODO: Fix this
// import { Parallax } from 'react-parallax'
import Typography from '@mui/material/Typography'

import styles from './mobile.module.scss'

export default function LandingSection(): ReactElement {
  return (
    <div>
      {/* <Parallax
        blur={1}
        bgImage="/assets/home/background_dragon-land.jpg"
        bgImageAlt="background landing"
        strength={120}
      > */}
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
      {/* </Parallax> */}
    </div>
  )
}
