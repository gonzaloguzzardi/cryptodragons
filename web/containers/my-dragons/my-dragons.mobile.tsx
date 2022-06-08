import React, { ReactElement } from 'react'

import { withAccountsHOC } from 'hooks/accounts-context'

import AppToolbar from 'components/app-toolbar'
import MyDragonsSearchContainerMobile from 'components/my-dragons/search-container/mobile'
import MyDragonsGridViewMobile from 'components/my-dragons/grid-view/mobile'
import FooterMobile from 'components/footer/mobile'

import { tProps } from './types'

function MyDragonsMobile({
  accountsState,
  attributeValue,
  attributes,
  chMainchain,
  chSidechain,
  dragons,
  filteredDragons,
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
        chMainchain={chMainchain}
        chSidechain={chSidechain}
        handleCheckedChange={handleCheckedChange}
        handleSearchChange={handleSearchChange}
        search={search}
        attributeValue={attributeValue}
        attributes={attributes}
        handleChangeAttribute={handleChangeAttribute}
        lowOrHigh={lowOrHigh}
        handleChangeSelectLowHigh={handleChangeSelectLowHigh}
      />
      <MyDragonsGridViewMobile
        dragons={dragons}
        filteredDragons={filteredDragons}
        loading={loading}
        transferMethod={transferMethod}
        mappedAccounts={accountsState && accountsState.mapped_accounts}
      />
      <FooterMobile />
    </>
  )
}

export default withAccountsHOC(MyDragonsMobile)
