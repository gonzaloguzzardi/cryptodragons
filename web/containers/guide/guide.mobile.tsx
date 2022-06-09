import React, { ReactElement } from 'react'

import { withAccountsHOC } from 'hooks/accounts-context'

import AppToolbar from 'components/app-toolbar'
import FooterMobile from 'components/footer/mobile'

function GuidesMobile({ accountsState, guidesData }): ReactElement {
  return (
    <>
      <AppToolbar deviceType="mobile" section="guides" accountsState={accountsState} />
      <p>Guides</p>
      {JSON.stringify(guidesData, null, 2)}
      <FooterMobile />
    </>
  )
}

export default withAccountsHOC(GuidesMobile)
