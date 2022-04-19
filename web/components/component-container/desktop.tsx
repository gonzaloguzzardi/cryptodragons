import React, { ReactElement } from 'react'

import styles from './desktop.module.scss'

export default function ComponentContainerDesktop({ children }): ReactElement {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        {children}
      </div>
    </div>
  )
}
