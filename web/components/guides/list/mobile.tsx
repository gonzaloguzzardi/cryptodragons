import { ReactElement } from 'react'
import Link from 'next/link'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'

import styles from './mobile.module.scss'
import { tProps } from './types'

export default function GuidesListMobile({ guidesData }: tProps): ReactElement {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        {guidesData.map(({ metadata, slug }, idx) => (
          <Link href={'/guide/' + slug} key={idx}>
            <CardActionArea>
              <Card sx={{ display: 'flex' }} raised>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5">
                      {metadata.title}
                    </Typography>
                    <Typography gutterBottom variant="body2" color="text.secondary">
                      {metadata.description}
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            </CardActionArea>
          </Link>
        ))}
      </div>
    </div>
  )
}
