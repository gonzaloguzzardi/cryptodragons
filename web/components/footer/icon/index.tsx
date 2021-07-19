import Link from 'next/link'

import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import YoutubeIcon from '@material-ui/icons/YouTube'
import AndroidOutlinedIcon from '@material-ui/icons/AndroidOutlined'
import AppleIcon from '@material-ui/icons/Apple'
import InstagramIcon from '@material-ui/icons/Instagram'

import styles from './index.module.scss'

import { ReactElement } from 'react'

type IProps = {
  className?: string
  href: string
  id: string
}

export default function Icon({ className, href, id }: IProps): ReactElement {
  let element = null

  switch (id) {
    case 'facebook':
      element = <FacebookIcon className={`${styles.icon} ${styles.iconFacebook} ${className}`} />
      break
    case 'twitter':
      element = <TwitterIcon className={`${styles.icon} ${styles.iconTwitter} ${className}`} />
      break
    case 'youtube':
      element = <YoutubeIcon className={`${styles.icon} ${styles.iconYoutube} ${className}`} />
      break
    case 'android':
      element = (
        <AndroidOutlinedIcon className={`${styles.icon} ${styles.iconAndroid} ${className}`} />
      )
      break
    case 'apple':
      element = <AppleIcon className={`${styles.icon} ${styles.iconApple} ${className}`} />
      break
    case 'instagram':
      element = <InstagramIcon className={`${styles.icon} ${styles.iconInstagram} ${className}`} />
      break
  }

  return (
    <Link href={href}>
      <a>{element}</a>
    </Link>
  )
}
