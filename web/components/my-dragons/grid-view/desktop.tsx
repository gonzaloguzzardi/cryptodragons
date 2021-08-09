import { ReactElement } from 'react'
import BuyDragonCard from '../../card/buy-dragon/desktop'
import Dragon from '../../dragon'
import CircularProgress from '@material-ui/core/CircularProgress'

import { tProps } from './types'
import styles from './desktop.module.scss'

export default function MyDragonsGridViewDesktop({
  dragons,
  loading,
  transferMethod,
  mappedAccounts,
}: tProps): ReactElement {
  if (loading) {
    return (
      <div className={styles.spinnerContainer}>
        <CircularProgress color="secondary" />
      </div>
    )
  }

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        {dragons.length === 0 && <BuyDragonCard />}

        {dragons.length > 0 &&
          dragons.map((dragon) => (
            <Dragon
              key={`${dragon.source}_${dragon.id}`}
              id={dragon.id}
              location={dragon.source}
              transferMethod={transferMethod}
              mappedAccounts={mappedAccounts}
            />
          ))}
      </div>
    </div>
  )
}
