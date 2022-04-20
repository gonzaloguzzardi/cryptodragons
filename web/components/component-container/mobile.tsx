import React, { ReactElement } from 'react'

import styles from './mobile.module.scss'

type tProps = { children: ReactElement }

export default function ComponentContainerMobile({ children }: tProps): ReactElement {
  return (
    <div className={styles.main}>
      <div className={styles.container}>{children}</div>
    </div>
  )
}
