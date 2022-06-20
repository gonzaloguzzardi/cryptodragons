import React, { ReactElement } from 'react'

import { withAccountsHOC } from 'hooks/accounts-context'

import AppToolbar from 'components/app-toolbar'
import GuideViewMobile from 'components/guides/view/mobile'
import FooterMobile from 'components/footer/mobile'

function GuidesMobile({ accountsState, guideData }): ReactElement {
  return (
    <>
      <AppToolbar deviceType="mobile" section="guides" accountsState={accountsState} />
      <GuideViewMobile guideData={guideData} />
      <FooterMobile />
    </>
  )
}

export default withAccountsHOC(GuidesMobile)
