import { useEffect, useState, ChangeEvent } from 'react'
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
  // LOADING toolbar feature
  const [loading, setLoading] = useState(false)

  // JWT Token
  const [token, setToken] = useState(null)

  // DRAGONS DATA: { dragonId, owner, onSale }
  const [dragonsMData, setDragonsMData] = useState([])
  const [dragonsSData, setDragonsSData] = useState([])

  // TABS: 0 for Mainchain, 1 for Sidechain
  const [tabValue, setTabValue] = useState(0)

  // PAGES: 1 for page, 10 for page size are default values
  const [pages, setPages] = useState(1)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // EDITING VALUE: Variable to retain the field value when editing the ERC721 props
  const [editingValue, setEditingValue] = useState(null)
  // EDITING LOADING: Variable to retain the loading value of the field being edited
  const [editingLoading, setEditingLoading] = useState(false)

  const updateTokensData = () => {
    setLoading(true)

    const API = tabValue === 0 ? MainchainAPI : SidechainAPI
    API.getDragonsByPage(page + 1, rowsPerPage)
      .then(result => {
        if (!result || !result[1][0]) return
        setPages(result[0])
        tabValue === 0 ? setDragonsMData(result[1]) : setDragonsSData(result[1]);
      })
      .finally(() => setLoading(false))
  }

  const cancelEditHandler = () => {
    const finalDragonsData = dragonsMData.map(dragonData => ({
      ...dragonData,
      editing: '',
    }));

    setDragonsMData(finalDragonsData);
  }

  const editHandler = (dragonId, column) => {
    const finalDragonsData = dragonsMData.map(dragonData => {
      if (dragonData.dragonId !== dragonId) {
        return {
          ...dragonData,
          editing: '',
        };
      }

      setEditingValue(dragonData[column]); // Set initial value for editing
      return {
        ...dragonData,
        editing: column,
      }
    })

    setDragonsMData(finalDragonsData);
  }

  const onChangeEditHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEditingValue(event.target.value);
  }
  
  const submitEditHandler = (dragonId, column, editingValue) => {
    if (column === 'owner') {
      setEditingLoading(true)

      MainchainAPI
        .transferDragonToNewOwner(dragonId, editingValue)
        .then(result => {
          console.log("Change owner success: ", result)
          updateTokensData()
        })
        .catch(err => {
          alert(`Error editing ${dragonId} with value: ${editingValue}`);
        })
        .finally(() => setEditingLoading(false))
    }

    if (column === 'onSale') {
      alert("TODO: Need to implement marketplace list feature")
    }
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
        dragonsMData={dragonsMData}
        dragonsSData={dragonsSData}
        cancelEditHandler={cancelEditHandler}
        editHandler={editHandler}
        editingLoading={editingLoading}
        editingValue={editingValue}
        onChangeEditHandler={onChangeEditHandler}
        tabValue={tabValue}
        setTabValue={setTabValue}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        submitEditHandler={submitEditHandler}
        updateTokensData={updateTokensData}
      />
    </Layout>
  )
}
