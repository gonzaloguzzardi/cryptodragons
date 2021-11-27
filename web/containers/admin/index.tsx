import { useEffect, useState } from 'react'
import { ReactElement } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Avatar from '@material-ui/core/Avatar'
import Toolbar from '@material-ui/core/Toolbar'

import Layout from '../../components/layout'
import AdminButtonsTokenCreate from '../../components/admin/buttons/tokens-create'
import AdminTable from '../../components/admin/table'

import { getSessionAdmin } from '../../services/admin'

import { JWT_LS_ID } from '../../constants'

import adminToolbarStyles from './admin-toolbar.module.scss'

export default function Admin(): ReactElement {
  const [token, setToken] = useState(null)

  useEffect(() => {
    getSessionAdmin(localStorage.getItem(JWT_LS_ID))
      .then((data) => {
        console.log(data)
        setToken(localStorage.getItem(JWT_LS_ID))
      })
      .catch((err) => {
        console.error('Redirecting', err)
        location.href = '/admin/login'
      })
  }, [])

  if (!token) {
    return <p>No admin privileges...</p>
  }

  return (
    <Layout>
      <AppBar variant="outlined">
        <Toolbar>
          <div className={adminToolbarStyles.toolbarIconLabelAnchor}>
            <Avatar variant="square" alt="CryptoDragons Icon" src="/assets/dragonsito.jpg" />
            <h6 className={adminToolbarStyles.toolbarLabel}>Admin</h6>
          </div>
        </Toolbar>
      </AppBar>
      <div className={adminToolbarStyles.bottomSpacer} />

      <AdminButtonsTokenCreate />
      <AdminTable />
    </Layout>
  )
}
