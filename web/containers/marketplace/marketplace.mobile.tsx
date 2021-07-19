import React, { ReactElement } from 'react'

import { withAccountsHOC } from '../../hooks/accounts-context'

import AppToolbar from '../../components/app-toolbar'

function MarketplaceMobile({ accountsState }): ReactElement {
  return (
    <>
      <AppToolbar deviceType="mobile" section="marketplace" accountsState={accountsState} />
      <p>Marketplace</p>
    </>
  )
}

export default withAccountsHOC(MarketplaceMobile)
