import React, { ReactElement } from 'react'

import styles from './index.module.scss'

export default function PageContainer({ children }): ReactElement {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}
