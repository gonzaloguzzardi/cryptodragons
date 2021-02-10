import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import { ReactElement } from 'react'

import styles from './index.module.scss'

export default function FeaturedCard(): ReactElement {
  let imageDragon = ''
  const random = Math.random()
  if (random <= 0.25) {
    imageDragon = '/assets/dragonsito2.jpeg'
  } else if (random <= 0.5) {
    imageDragon = '/assets/dragonsito3.png'
  } else if (random <= 0.75) {
    imageDragon = '/assets/dragonsito4.jpeg'
  } else {
    imageDragon = '/assets/dragonsito5.jpeg'
  }

  return (
    <Card className={styles.card} raised>
      <CardActionArea>
        <CardContent>
          <Typography variant="h5" component="h2">
            Lizard
          </Typography>
        </CardContent>
        <CardMedia className={styles.media} image={imageDragon} title="Dragon 1" />
        <CardContent>
          <div className={styles.cardBottomContent}>
            <div className={styles.cardBottomContentAvatar}>
              <Avatar alt="Mocca" src="/assets/mocca.jpg" />
            </div>
            <div className={styles.cardBottomContentText}>
              <Typography variant="body2" color="textSecondary" component="p">
                Owned by
              </Typography>
              <Typography variant="body2" color="textPrimary" component="p">
                Mocca
              </Typography>
            </div>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
