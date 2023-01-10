import { useEffect, useState, SyntheticEvent } from 'react'
import { ReactElement } from 'react'

import Layout from 'components/layout'
import AdminTableButtons from 'components/admin/buttons'
import AdminTable from 'components/admin/table'
import AdminToolbar from 'components/admin/toolbar'

import MainchainAPI from 'services/blockchain-interaction/mainchain'
import SidechainAPI from 'services/blockchain-interaction/sidechain'
import { getSessionAdmin } from 'services/admin'

import { JWT_LS_ID } from '../../constants'

export default function Admin(): ReactElement {
  // LOADING feature
  const [loading, setLoading] = useState(false)

  // JWT Token
  const [token, setToken] = useState(null)

  // DRAGONS DATA: { dragonId, owner, onSale }
  const [dragonsData, setDragonsData] = useState([])

  // TABS: 0 for Mainchain, 1 for Sidechain
  const [tabValue, setTabValue] = useState(0)

  // PAGES: 1 for page, 10 for page size are default values
  const [pages, setPages] = useState(1)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const updateTokensData = () => {
    setLoading(true)
    setDragonsData([])

    const API = tabValue === 0 ? MainchainAPI : SidechainAPI
    API.getDragonsByPage(page + 1, rowsPerPage)
      .then(result => {
        if (!result || !result[1][0]) return
        setPages(result[0])
        setDragonsData(result[1])
      })
      .finally(() => setLoading(false))
  }

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
      <AdminTableButtons setLoading={setLoading} updateTokensData={updateTokensData} />
      <AdminTable
        dragonsData={dragonsData}
        tabValue={tabValue}
        setTabValue={setTabValue}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        updateTokensData={updateTokensData}
      />
    </Layout>
  )
}
