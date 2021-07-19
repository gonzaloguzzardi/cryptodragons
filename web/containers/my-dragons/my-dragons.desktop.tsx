import React from 'react'
import { ReactElement } from 'react'

import { withAccountsHOC } from '../../hooks/accounts-context'

import AppToolbar from '../../components/app-toolbar'

function MyDragonsDesktop({ accountsState }): ReactElement {
  return (
    <>
      <AppToolbar deviceType="desktop" section="my-dragons" accountsState={accountsState} />
      <p>My Dragons</p>
    </>
  )
}

export default withAccountsHOC(MyDragonsDesktop)
