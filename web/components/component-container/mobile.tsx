import React, { ReactElement } from 'react'

import styles from './mobile.module.scss'

export default function ComponentContainerMobile({ children }): ReactElement {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        {children}
      </div>
    </div>
  )
}
