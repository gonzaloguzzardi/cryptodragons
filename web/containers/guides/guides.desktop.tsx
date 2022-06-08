import React, { ReactElement } from 'react'

import { withAccountsHOC } from 'hooks/accounts-context'

import AppToolbar from 'components/app-toolbar'
import FooterDesktop from 'components/footer/desktop'

function GuidesDesktop({ accountsState, content }): ReactElement {
  return (
    <>
      <AppToolbar deviceType="desktop" section="guides" accountsState={accountsState} />
      <p>Guides</p>
      {content}
      <FooterDesktop />
    </>
  )
}

export default withAccountsHOC(GuidesDesktop)
