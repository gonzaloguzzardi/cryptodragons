import { ReactElement } from 'react'
import BuyDragonCard from '../../card/buy-dragon/mobile'
import CircularProgress from '@material-ui/core/CircularProgress'

import { tProps } from './types'
import styles from './mobile.module.scss'

export default function MyDragonsGridViewMobile({ dragons, loading }: tProps): ReactElement {
  if (loading) {
    return <CircularProgress />
  }

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
