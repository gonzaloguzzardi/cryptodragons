import React, { ReactElement } from 'react'

import { withAccountsHOC } from '../../hooks/accounts-context'

import AppToolbar from '../../components/app-toolbar'
// import MyDragonsSearchContainerMobile from '../../components/my-dragons/search-container/mobile'
// import MyDragonsGridViewMobile from '../../components/my-dragons/grid-view/desktop'
import FooterMobile from '../../components/footer/mobile'

function MyDragonsMobile({ accountsState }): ReactElement {
  return (
    <>
      <AppToolbar deviceType="mobile" section="my-dragons" accountsState={accountsState} />
      {/* <MyDragonsSearchContainerMobile />
      <MyDragonsGridViewMobile /> */}
      <FooterMobile />
    </>
  )
}

export default withAccountsHOC(MyDragonsMobile)
