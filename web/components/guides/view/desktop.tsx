import { ReactElement } from 'react'
import { MDXRemote } from 'next-mdx-remote'
import Link from 'next/link'
import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import styles from './desktop.module.scss'
import { tProps } from './types'

export default function GuidesListDesktop({ guideData }: tProps): ReactElement {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        {/* Back Button */}
        <Link href={'/guides'}>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            fullWidth
          >
            <Typography gutterBottom variant="h3" component="div">
              Back
            </Typography>
          </Button>
        </Link>

        {/* Metadata */}
        <CardMedia
          component="img"
          height="160"
          image={guideData.metadata.thumbnailUrl}
          alt="guide thumbnail"
        />
        <Typography gutterBottom variant="h5" component="div">
          {guideData.metadata.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {guideData.metadata.description}
        </Typography>

        {/* MDX Content */}
        <MDXRemote {...guideData.mdxContent} components={{ Button }} />
      </div>
    </div>
  )
}
