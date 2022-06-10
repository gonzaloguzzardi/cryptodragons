import { ReactElement } from 'react'
import { MDXRemote } from 'next-mdx-remote'
import Link from 'next/link'
import Button from '@mui/material/Button'
// import CardMedia from '@mui/material/CardMedia';
import Image from 'next/image'
import Typography from '@mui/material/Typography';

import styles from './desktop.module.scss'
import { tProps } from './types'

const components = {
  img: (props) => <Image alt={props.alt} layout="responsive" {...props} />,
  h1: (props) => <Typography gutterBottom variant="h1" {...props}/>,
  h2: (props) => <Typography gutterBottom variant="h2" {...props}/>,
  p: (props) => <Typography gutterBottom variant="p" {...props}/>,
  Button,
}

export default function GuidesListDesktop({ guideData }: tProps): ReactElement {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        {/* Back Button */}
        <Link href={'/guides'}>
          <a className={styles.guidesAnchor}>
            <Typography variant="caption" color="secondary" component="p" fontSize={16}>
              {'< Guides'}
            </Typography>
          </a>
        </Link>

        {/* Metadata */}
        {/* @TODO: Add thumbnail img in here
          <CardMedia
            component="img"
            height="160"
            image={guideData.metadata.thumbnailUrl}
            alt="guide thumbnail"
          />
        */}

        {/* Metadata */}
        <Typography gutterBottom variant="h4">
          {guideData.metadata.title}
        </Typography>
        <Typography gutterBottom variant="body1" fontStyle="italic" color="text.secondary">
          {guideData.metadata.description}
        </Typography>

        {/* MDX Content */}
        <MDXRemote {...guideData.mdxContent} components={components} />
      </div>
    </div>
  )
}
