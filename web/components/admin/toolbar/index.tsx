import { ReactElement } from 'react'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import LinearProgress from '@mui/material/LinearProgress'
import Toolbar from '@mui/material/Toolbar'

import styles from './styles.module.scss'

export default function AdminToolbar({ loadingState = false }): ReactElement {
  return (
    <>
      <AppBar>
        <Toolbar>
          <div className={styles.toolbarIconLabelAnchor}>
            <Avatar variant="square" alt="CryptoDragons Icon" src="/assets/dragonsito.jpg" />
            <h6 className={styles.toolbarLabel}>Admin</h6>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
      {loadingState && <LinearProgress color="secondary" />}
    </>
  )
}
