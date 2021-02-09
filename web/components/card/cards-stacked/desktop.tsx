import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import { ReactElement } from 'react'

import styles from './desktop.module.scss'

export default function ShowcaseCardDemo(): ReactElement {
  return (
    <Card className={styles.card}>
      <CardActionArea>
        <CardContent>
          <Typography variant="h5" component="h2">
            Lizard
          </Typography>
        </CardContent>
        <CardMedia className={styles.media} image="/assets/dragonsito2.jpeg" title="Dragon 1" />
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
