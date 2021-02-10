import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import { ReactElement } from 'react'

import styles from './index.module.scss'

type IProps = {
  image: string
  name: string
  owner: {
    name: string
    image: string
  }
}

export default function FeaturedCard({ image, name, owner }: IProps): ReactElement {
  return (
    <Card className={styles.card} raised>
      <CardActionArea>
        <CardContent>
          <Typography variant="h5" component="h2">
            {name}
          </Typography>
        </CardContent>
        <CardMedia className={styles.media} image={image} title={name} />
        <CardContent>
          <div className={styles.cardBottomContent}>
            <div className={styles.cardBottomContentAvatar}>
              <Avatar alt={owner.name} src={owner.image} />
            </div>
            <div className={styles.cardBottomContentText}>
              <Typography variant="body2" color="textSecondary" component="p">
                Owned by
              </Typography>
              <Typography variant="body2" color="textPrimary" component="p">
                {owner.name}
              </Typography>
            </div>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
