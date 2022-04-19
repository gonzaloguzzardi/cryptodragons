import React, { ReactElement } from 'react'

import { withAccountsHOC } from 'hooks/accounts-context'

import AppToolbar from 'components/app-toolbar'
import FooterMobile from 'components/footer/mobile'

function MarketplaceMobile({ accountsState }): ReactElement {
  return (
    <>
      <AppToolbar deviceType="mobile" section="marketplace" accountsState={accountsState} />
      <p>Marketplace</p>
      <FooterMobile />
    </>
  )
}

export default withAccountsHOC(MarketplaceMobile)
