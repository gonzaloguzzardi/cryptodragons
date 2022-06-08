import React, { ReactElement } from 'react'

import { withAccountsHOC } from 'hooks/accounts-context'

import AppToolbar from 'components/app-toolbar'
import FooterMobile from 'components/footer/mobile'

function GuidesMobile({ accountsState, content }): ReactElement {
  return (
    <>
      <AppToolbar deviceType="mobile" section="guides" accountsState={accountsState} />
      <p>Guides</p>
      {content}
      <FooterMobile />
    </>
  )
}

export default withAccountsHOC(GuidesMobile)
