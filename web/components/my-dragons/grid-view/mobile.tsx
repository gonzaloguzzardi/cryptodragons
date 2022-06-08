import { ReactElement } from 'react'
import BuyDragonCard from '../../card/buy-dragon/mobile'
import Dragon from '../../dragon'
import CircularProgress from '@mui/material/CircularProgress'

import { tProps } from './types'
import styles from './mobile.module.scss'

export default function MyDragonsGridViewMobile({
  dragons,
  filteredDragons,
  loading,
  mappedAccounts,
  transferMethod,
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
        {filteredDragons.length === 0 && dragons.length === 0 && <BuyDragonCard />}
        {filteredDragons.length === 0 && dragons.length > 0 && <p>Try another search</p>}

        {filteredDragons.length > 0 &&
          filteredDragons.map((dragon) => (
            <Dragon
              key={`${dragon.source}_${dragon.id}`}
              id={dragon.id}
              location={dragon.source}
              mappedAccounts={mappedAccounts}
              transferMethod={transferMethod}
            />
          ))}
      </div>
    </div>
  )
}
