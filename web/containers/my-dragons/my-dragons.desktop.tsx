import React from 'react'
import { ReactElement } from 'react'

import { withAccountsHOC } from '../../hooks/accounts-context'

import AppToolbar from '../../components/app-toolbar'
import MyDragonsSearchContainerDesktop from '../../components/my-dragons/search-container/desktop'
import MyDragonsGridViewDesktop from '../../components/my-dragons/grid-view/desktop'
import FooterDesktop from '../../components/footer/desktop'

function MyDragonsDesktop({ accountsState }): ReactElement {
  return (
    <>
      <AppToolbar deviceType="desktop" section="my-dragons" accountsState={accountsState} />
      <MyDragonsSearchContainerDesktop />
      <MyDragonsGridViewDesktop />
      <FooterDesktop />
    </>
  )
}

export default withAccountsHOC(MyDragonsDesktop)
