import React from 'react'
import { ReactElement } from 'react'

import { withAccountsHOC } from 'hooks/accounts-context'

import AppToolbar from 'components/app-toolbar'

function GuidesMobile({ accountsState }): ReactElement {
  return (
    <>
      <AppToolbar deviceType="mobile" section="guides" accountsState={accountsState} />
      <p>Guides</p>
    </>
  )
}

export default withAccountsHOC(GuidesMobile)
