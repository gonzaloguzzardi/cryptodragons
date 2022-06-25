import { ReactElement } from 'react'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Toolbar from '@mui/material/Toolbar'

import styles from './styles.module.scss'

export default function AdminToolbar(): ReactElement {
  return (
    <>
      <AppBar variant="outlined">
        <Toolbar>
          <div className={styles.toolbarIconLabelAnchor}>
            <Avatar variant="square" alt="CryptoDragons Icon" src="/assets/dragonsito.jpg" />
            <h6 className={styles.toolbarLabel}>Admin</h6>
          </div>
        </Toolbar>
      </AppBar>
      <div className={styles.bottomSpacer} />
    </>
  )
}
