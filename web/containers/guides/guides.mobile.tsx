import React, { ReactElement } from 'react'

import { withAccountsHOC } from 'hooks/accounts-context'

import AppToolbar from 'components/app-toolbar'
import GuidesListMobile from 'components/guides/list/mobile'
import FooterMobile from 'components/footer/mobile'

function GuidesMobile({ accountsState, guidesData }): ReactElement {
  return (
    <>
      <AppToolbar deviceType="mobile" section="guides" accountsState={accountsState} />
      <GuidesListMobile guidesData={guidesData} />
      <FooterMobile />
    </>
  )
}

export default withAccountsHOC(GuidesMobile)
