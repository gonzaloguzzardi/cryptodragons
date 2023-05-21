import { ReactElement } from 'react'
import Dragon from 'components/dragon'
import CircularProgress from '@mui/material/CircularProgress'

import { tProps } from './types'
import styles from './mobile.module.scss'

export default function MarketplaceGridViewMobile({
  dragons,
  filteredDragons,
  loading,
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
        {filteredDragons.length === 0 && <p>No dragons available...</p>}

        {filteredDragons.length > 0 &&
          filteredDragons.map((dragon) => (
            <Dragon key={`${dragon.listingId}`} id={dragon.tokenId} location={'MAINCHAIN'} />
          ))}
      </div>
    </div>
  )
}
