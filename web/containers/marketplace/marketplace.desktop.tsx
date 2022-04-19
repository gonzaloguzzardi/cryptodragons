import React, { ReactElement } from 'react'

import { withAccountsHOC } from 'hooks/accounts-context'

import AppToolbar from 'components/app-toolbar'
import FooterDesktop from 'components/footer/desktop'

function MarketplaceDesktop({ accountsState }): ReactElement {
  return (
    <>
      <AppToolbar deviceType="desktop" section="marketplace" accountsState={accountsState} />
      <p>Marketplace</p>
      <FooterDesktop />
    </>
  )
}

export default withAccountsHOC(MarketplaceDesktop)
