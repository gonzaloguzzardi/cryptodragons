import Link from 'next/link'

import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import YoutubeIcon from '@material-ui/icons/YouTube'
import AndroidOutlinedIcon from '@material-ui/icons/AndroidOutlined'
import AppleIcon from '@material-ui/icons/Apple'
import InstagramIcon from '@material-ui/icons/Instagram'
import AddIcon from '@material-ui/icons/Add'

import styles from './index.module.scss'

import { ReactElement } from 'react'

type IProps = {
  height: string
  id: string
  width: string
  className?: string
  href?: string
}

export default function Icon({ className, height, href, id, width }: IProps): ReactElement {
  let element = null

  switch (id) {
    case 'facebook':
      element = (
        <FacebookIcon
          className={`${styles.icon} ${styles.iconFacebook} ${className}`}
          style={{ height, width }}
        />
      )
      break
    case 'twitter':
      element = (
        <TwitterIcon
          className={`${styles.icon} ${styles.iconTwitter} ${className}`}
          style={{ height, width }}
        />
      )
      break
    case 'youtube':
      element = (
        <YoutubeIcon
          className={`${styles.icon} ${styles.iconYoutube} ${className}`}
          style={{ height, width }}
        />
      )
      break
    case 'android':
      element = (
        <AndroidOutlinedIcon
          className={`${styles.icon} ${styles.iconAndroid} ${className}`}
          style={{ height, width }}
        />
      )
      break
    case 'apple':
      element = (
        <AppleIcon
          className={`${styles.icon} ${styles.iconApple} ${className}`}
          style={{ height, width }}
        />
      )
      break
    case 'instagram':
      element = (
        <InstagramIcon
          className={`${styles.icon} ${styles.iconInstagram} ${className}`}
          style={{ height, width }}
        />
      )
      break
    case '+':
      element = <AddIcon className={`${styles.icon} ${className}`} style={{ height, width }} />
      break
  }

  if (!href) return element

  return (
    <Link href={href}>
      <a>{element}</a>
    </Link>
  )
}
