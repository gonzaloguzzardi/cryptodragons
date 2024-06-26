import React, { ReactElement } from 'react'

import { withAccountsHOC } from 'hooks/accounts-context'

import AppToolbar from 'components/app-toolbar'
import MarketplaceSearchContainerMobile from 'components/marketplace/search-container/mobile'
import MarketplaceGridViewMobile from 'components/marketplace/grid-view/mobile'
import FooterMobile from 'components/footer/mobile'

import { tProps } from './types'

function MarketplaceMobile({
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
      <AppToolbar deviceType="mobile" section="marketplace" accountsState={accountsState} />
      <MarketplaceSearchContainerMobile
        attributeValue={attributeValue}
        attributes={attributes}
        lowOrHigh={lowOrHigh}
        handleChangeSelectLowHigh={handleChangeSelectLowHigh}
      />
      <MarketplaceGridViewMobile
        dragons={dragons}
        myDragons={myDragons}
        filteredDragons={filteredDragons}
        loading={loading}
      />
      <FooterMobile />
    </>
  )
}

export default withAccountsHOC(MarketplaceMobile)
