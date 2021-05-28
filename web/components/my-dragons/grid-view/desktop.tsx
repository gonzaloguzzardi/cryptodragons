import { ReactElement } from 'react'
import BuyDragonCard from '../../card/buy-dragon/desktop'

import { tProps } from './types'
import styles from './desktop.module.scss'

export default function MyDragonsGridViewDesktop({ dragons }: tProps): ReactElement {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        {dragons.length === 0 && <BuyDragonCard />}

        {dragons.length > 0 && (
          <>
            <p>dragons cardsssss</p>
          </>
        )}
      </div>
    </div>
  )
}
