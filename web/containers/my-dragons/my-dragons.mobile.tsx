import React, { ReactElement } from 'react'

import { withAccountsHOC } from '../../hooks/accounts-context'

import AppToolbar from '../../components/app-toolbar'
import FooterMobile from '../../components/footer/mobile'

function MyDragonsMobile({ accountsState }): ReactElement {
  return (
    <>
      <AppToolbar deviceType="mobile" section="my-dragons" accountsState={accountsState} />
      <p style={{ height: '70vh' }}>My Dragons</p>
      <FooterMobile />
    </>
  )
}

export default withAccountsHOC(MyDragonsMobile)
