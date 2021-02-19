import React, { ReactElement } from 'react'

import { withAccountsHOC } from '../../hooks/accounts-context'

import AppToolbar from '../../components/app-toolbar'

function MyDragonsMobile({ accountsState }): ReactElement {
  return (
    <>
      <AppToolbar deviceType="mobile" section="my-dragons" accountsState={accountsState} />
      <p>My Dragons</p>
    </>
  )
}

export default withAccountsHOC(MyDragonsMobile)
