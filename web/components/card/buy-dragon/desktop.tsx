import React from 'react'
import Link from 'next/link'
import Typography from '@mui/material/Typography'
import Icon from '../../icon'
import { ReactElement } from 'react'
import MainchainAPI from 'services/blockchain-interaction/mainchain'

import styles from './desktop.module.scss'

export default function BuyDragonCardDesktop(): ReactElement {
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

export function BuyMainDragonCardDesktop(): ReactElement {

  const handleClick = (): void => {
    MainchainAPI.createDragon().then((res) =>
      console.log('[MAINCHAIN]: Dragon create response', res)
    )
  };

  return (
    <div onClick={handleClick} className={styles.container}>
      <div className={styles.content}>
        <Icon id="+" height="50px" width="50px" className={styles.addIcon} />
        <Typography variant="h6" className={styles.heading}>
          Create your first random dragon 
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          This is a unique change to get a Dragon!
        </Typography>
      </div>
    </div>
  )
}