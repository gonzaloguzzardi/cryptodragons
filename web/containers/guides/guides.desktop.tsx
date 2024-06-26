import React, { ReactElement } from 'react'

import { withAccountsHOC } from 'hooks/accounts-context'

import AppToolbar from 'components/app-toolbar'
import GuidesListDesktop from 'components/guides/list/desktop'
import FooterDesktop from 'components/footer/desktop'

function GuidesDesktop({ accountsState, guidesData }): ReactElement {
  return (
    <>
      <AppToolbar deviceType="desktop" section="guides" accountsState={accountsState} />
      <GuidesListDesktop guidesData={guidesData} />
      <FooterDesktop />
    </>
  )
}

export default withAccountsHOC(GuidesDesktop)
