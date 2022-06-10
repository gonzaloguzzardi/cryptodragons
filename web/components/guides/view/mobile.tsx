import { ReactElement } from 'react'
import Link from 'next/link'
// import Image from 'next/image'
import Typography from '@mui/material/Typography'
import MDXRenderer from 'components/MDXRenderer'

import styles from './mobile.module.scss'
import { tProps } from './types'

export default function GuidesListMobile({ guideData }: tProps): ReactElement {
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
          <Image
            alt="guide thumbnail"
            height="160"
            src={guideData.metadata.thumbnailUrl}
          />
        */}
        <Typography gutterBottom variant="h4">
          {guideData.metadata.title}
        </Typography>
        <Typography gutterBottom variant="body1" fontStyle="italic" color="text.secondary">
          {guideData.metadata.description}
        </Typography>

        {/* MDX Content */}
        <MDXRenderer {...guideData.mdxContent} />
      </div>
    </div>
  )
}
