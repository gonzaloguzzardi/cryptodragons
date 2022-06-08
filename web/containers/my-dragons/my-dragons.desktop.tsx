import React from 'react'
import { ReactElement } from 'react'

import { withAccountsHOC } from 'hooks/accounts-context'

import AppToolbar from 'components/app-toolbar'
import MyDragonsSearchContainerDesktop from 'components/my-dragons/search-container/desktop'
import MyDragonsGridViewDesktop from 'components/my-dragons/grid-view/desktop'
import FooterDesktop from 'components/footer/desktop'

import { tProps } from './types'

function MyDragonsDesktop({
  accountsState,
  attributeValue,
  attributes,
  chMainchain,
  chSidechain,
  dragons,
  filteredDragons,
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
      <MyDragonsGridViewDesktop
        dragons={dragons}
        filteredDragons={filteredDragons}
        loading={loading}
        transferMethod={transferMethod}
        mappedAccounts={accountsState && accountsState.mapped_accounts}
      />
      <FooterDesktop />
    </>
  )
}

export default withAccountsHOC(MyDragonsDesktop)
