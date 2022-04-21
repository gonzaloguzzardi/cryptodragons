import { ReactElement } from 'react'
import Dragon from 'components/dragon'
import CircularProgress from '@material-ui/core/CircularProgress'

import { tProps } from './types'
import styles from './desktop.module.scss'

export default function MarketplaceGridViewDesktop({
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
        {filteredDragons.length === 0 && dragons.length === 0 && <p>No dragons available...</p>}
        {filteredDragons.length === 0 && dragons.length > 0 && <p>Try another search</p>}

        {filteredDragons.length > 0 &&
          filteredDragons.map((dragon) => (
            <Dragon key={`${dragon.source}_${dragon.id}`} id={dragon.id} location={dragon.source} />
          ))}
      </div>
    </div>
  )
}
