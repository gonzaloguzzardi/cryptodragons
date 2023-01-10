import { useEffect, useState } from 'react'
import { ReactElement } from 'react'

import Layout from 'components/layout'
import AdminButtonsTokenCreate from 'components/admin/buttons/tokens-create'
import AdminTable from 'components/admin/table'
import AdminToolbar from 'components/admin/toolbar'

import { getSessionAdmin } from 'services/admin'

import { JWT_LS_ID } from '../../constants'

export default function Admin(): ReactElement {
  const [loading, setLoading] = useState(false)
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
    return <></>
  }

  return (
    <Layout>
      <AdminToolbar loadingState={loading} />
      <AdminButtonsTokenCreate setLoading={setLoading} />
      <AdminTable />
    </Layout>
  )
}
