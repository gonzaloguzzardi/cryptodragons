import React from 'react'
import { ReactElement } from 'react'

import { withAccountsHOC } from 'hooks/accounts-context'

import AppToolbar from 'components/app-toolbar'

function GuidesDesktop({ accountsState }): ReactElement {
  return (
    <>
      <AppToolbar deviceType="desktop" section="guides" accountsState={accountsState} />
      <p>Guides</p>
    </>
  )
}

export default withAccountsHOC(GuidesDesktop)
