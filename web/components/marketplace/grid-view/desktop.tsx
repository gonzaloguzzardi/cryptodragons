import { ReactElement } from 'react'
import Dragon from 'components/dragon'
import CircularProgress from '@mui/material/CircularProgress'

import styles from './desktop.module.scss'

import { tProps } from './types'

export default function MarketplaceGridViewDesktop({
  dragons,
  myDragons,
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
            <Dragon
              key={`${dragon.listingId}`}
              id={dragon.tokenId}
              location={'MAINCHAIN'}
              owned={myDragons.includes(dragon.tokenId)}
              listingId={dragon.listingId}
            />
          ))}
      </div>
    </div>
  )
}
