import React, { ReactElement } from 'react'

import { withAccountsHOC } from 'hooks/accounts-context'

import AppToolbar from 'components/app-toolbar'
import ComponentContainerDesktop from 'components/component-container/desktop'
import SortingBarDesktop from 'components/sorting-bar/desktop'
import FooterDesktop from 'components/footer/desktop'

function MarketplaceDesktop({
  accountsState,
  attributeValue,
  attributes,
  handleChangeAttribute,
  lowOrHigh,
  handleChangeSelectLowHigh,
}): ReactElement {
  return (
    <>
      <AppToolbar deviceType="desktop" section="marketplace" accountsState={accountsState} />

      <ComponentContainerDesktop>
        <SortingBarDesktop
          checkboxes={false}
          attributeValue={attributeValue}
          attributes={attributes}
          handleChangeAttribute={handleChangeAttribute}
          lowOrHigh={lowOrHigh}
          handleChangeSelectLowHigh={handleChangeSelectLowHigh}
        />
      </ComponentContainerDesktop>

      <FooterDesktop />
    </>
  )
}

export default withAccountsHOC(MarketplaceDesktop)
