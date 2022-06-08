import React from 'react'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
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
