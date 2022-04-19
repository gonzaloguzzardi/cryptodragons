import React, { ReactElement } from 'react'

import { withAccountsHOC } from 'hooks/accounts-context'

import AppToolbar from 'components/app-toolbar'
import ComponentContainerDesktop from 'components/component-container/desktop'
import FooterDesktop from 'components/footer/desktop'

function MarketplaceDesktop({ accountsState }): ReactElement {
  return (
    <>
      <AppToolbar deviceType="desktop" section="marketplace" accountsState={accountsState} />

      <ComponentContainerDesktop>
        <p>Marketplace</p>
      </ComponentContainerDesktop>

      <FooterDesktop />
    </>
  )
}

export default withAccountsHOC(MarketplaceDesktop)
