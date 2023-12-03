import React, { ReactElement } from 'react'

import { withAccountsHOC } from 'hooks/accounts-context'

import AppToolbar from 'components/app-toolbar'
import MarketplaceSearchContainerDesktop from 'components/marketplace/search-container/desktop'
import MarketplaceGridViewDesktop from 'components/marketplace/grid-view/desktop'
import FooterDesktop from 'components/footer/desktop'

import { tProps } from './types'

function MarketplaceDesktop({
  dragons,
  myDragons,
  filteredDragons,
  loading,
  accountsState,
  attributeValue,
  attributes,
  lowOrHigh,
  handleChangeSelectLowHigh,
}: tProps): ReactElement {
  return (
    <>
      <AppToolbar deviceType="desktop" section="marketplace" accountsState={accountsState} />
      <MarketplaceSearchContainerDesktop
        attributeValue={attributeValue}
        attributes={attributes}
        lowOrHigh={lowOrHigh}
        handleChangeSelectLowHigh={handleChangeSelectLowHigh}
      />
      <MarketplaceGridViewDesktop
        dragons={dragons}
        myDragons={myDragons}
        filteredDragons={filteredDragons}
        loading={loading}
      />
      <FooterDesktop />
    </>
  )
}

export default withAccountsHOC(MarketplaceDesktop)
