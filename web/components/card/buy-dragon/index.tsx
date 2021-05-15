import React from 'react'
import Link from 'next/link'
import Typography from '@material-ui/core/Typography'
import Icon from '../../icon'
import { ReactElement } from 'react'

import styles from './index.module.scss'

export default function BuyDragonCard(): ReactElement {
  return (
    <Link href="/marketplace">
      <div className={styles.container}>
        <div className={styles.content}>
          <Icon id="+" height="50px" width="50px" className={styles.addIcon} />
          <Typography variant="h6" className={styles.heading}>
            Get your first Dragon!
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            This is your first step to start collecting your CryptoDragons!
          </Typography>
        </div>
      </div>
    </Link>
  )
}
