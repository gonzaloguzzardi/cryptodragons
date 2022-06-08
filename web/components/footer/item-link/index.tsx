import Link from 'next/link'

import Typography from '@mui/material/Typography'

import styles from './item-link.module.scss'

import { ReactElement } from 'react'

type IProps = {
  href: string
  text: string
}

export default function ItemLink({ href, text }: IProps): ReactElement {
  return (
    <Link href={href}>
      <a className={styles.anchorTag}>
        <Typography variant="caption" color="primary" component="p">
          {text}
        </Typography>
      </a>
    </Link>
  )
}
