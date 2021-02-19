import React, { ReactElement } from 'react'

import { withAccountsHOC } from '../../hooks/accounts-context'

import AppToolbar from '../../components/app-toolbar'

function MarketplaceDesktop({ accountsState }): ReactElement {
  return (
    <>
      <AppToolbar deviceType="desktop" section="marketplace" accountsState={accountsState} />
      <p>Marketplace</p>
    </>
  )
}

export default withAccountsHOC(MarketplaceDesktop)
