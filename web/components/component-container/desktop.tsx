import React, { ReactElement } from 'react'

import styles from './desktop.module.scss'

type tProps = { children: ReactElement }

export default function ComponentContainerDesktop({ children }: tProps): ReactElement {
  return (
    <div className={styles.main}>
      <div className={styles.container}>{children}</div>
    </div>
  )
}
