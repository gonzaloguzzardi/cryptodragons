import React from 'react'
import { ReactElement } from 'react'

import { withAccountsHOC } from '../../hooks/accounts-context'

import AppToolbar from '../../components/app-toolbar'
import MyDragonsSearchContainerDesktop from '../../components/my-dragons/search-container/desktop'
import MyDragonsGridViewDesktop from '../../components/my-dragons/grid-view/desktop'
import FooterDesktop from '../../components/footer/desktop'

import { tProps } from './types'

function MyDragonsDesktop({
  accountsState,
  attribute,
  checkedMainchain,
  checkedSidechain,
  dragons,
  handleChangeAttribute,
  handleChangeSelectLowHigh,
  handleCheckedChange,
  handleSearchChange,
  loading,
  lowOrHigh,
  search,
  transferMethod,
}: tProps): ReactElement {
  return (
    <>
      <AppToolbar deviceType="desktop" section="my-dragons" accountsState={accountsState} />
      <MyDragonsSearchContainerDesktop
        checkedMainchain={checkedMainchain}
        checkedSidechain={checkedSidechain}
        handleCheckedChange={handleCheckedChange}
        handleSearchChange={handleSearchChange}
        search={search}
        attribute={attribute}
        handleChangeAttribute={handleChangeAttribute}
        lowOrHigh={lowOrHigh}
        handleChangeSelectLowHigh={handleChangeSelectLowHigh}
      />
      <MyDragonsGridViewDesktop
        dragons={dragons}
        loading={loading}
        transferMethod={transferMethod}
        mappedAccounts={accountsState && accountsState.mapped_accounts}
      />
      <FooterDesktop />
    </>
  )
}

export default withAccountsHOC(MyDragonsDesktop)
