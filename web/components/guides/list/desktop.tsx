import { ReactElement } from 'react'
import Link from 'next/link'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import styles from './desktop.module.scss'
import { tProps } from './types'

export default function GuidesListDesktop({ guidesData }: tProps): ReactElement {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        {guidesData.map(({ metadata, slug }, idx) => (
          <Link href={'/guide/' + slug} key={idx}>
            <CardActionArea>
              <Card sx={{ display: 'flex' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {metadata.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {metadata.description}
                    </Typography>
                  </CardContent>
                </Box>
                <CardMedia
                  component="img"
                  height="160"
                  image={metadata.thumbnailUrl}
                  alt="guide thumbnail"
                />
              </Card>
            </CardActionArea>
          </Link>
        ))}
      </div>
    </div>
  )
}
