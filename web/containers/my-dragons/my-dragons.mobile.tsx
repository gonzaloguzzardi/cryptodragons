import React, { ReactElement } from 'react'

import { withAccountsHOC } from '../../hooks/accounts-context'

import AppToolbar from '../../components/app-toolbar'
import MyDragonsSearchContainerMobile from '../../components/my-dragons/search-container/mobile'
import MyDragonsGridViewMobile from '../../components/my-dragons/grid-view/mobile'
import FooterMobile from '../../components/footer/mobile'

import { tProps } from './types'

function MyDragonsMobile({
  accountsState,
  attribute,
  checkedMainchain,
  checkedSidechain,
  dragons,
  handleCheckedChange,
  handleSearchChange,
  handleChangeAttribute,
  handleChangeSelectLowHigh,
  loading,
  lowOrHigh,
  search,
  transferMethod,
}: tProps): ReactElement {
  return (
    <>
      <AppToolbar deviceType="mobile" section="my-dragons" accountsState={accountsState} />
      <MyDragonsSearchContainerMobile
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
      <MyDragonsGridViewMobile
        dragons={dragons}
        loading={loading}
        transferMethod={transferMethod}
        mappedAccounts={accountsState && accountsState.mapped_accounts}
      />
      <FooterMobile />
    </>
  )
}

export default withAccountsHOC(MyDragonsMobile)
