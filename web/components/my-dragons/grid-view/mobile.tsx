import { ReactElement } from 'react'
import BuyDragonCard from '../../card/buy-dragon'

import styles from './mobile.module.scss'

export default function MyDragonsGridViewMobile(): ReactElement {
  const dragons = []

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        {dragons.length === 0 && <BuyDragonCard width="150px" height="200px" />}

        {dragons.length > 0 && (
          <>
            <p>dragons cardsssss</p>
          </>
        )}
      </div>
    </div>
  )
}
