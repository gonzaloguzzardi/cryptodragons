import React, { ReactElement } from 'react'

import { withAccountsHOC } from 'hooks/accounts-context'

import AppToolbar from 'components/app-toolbar'
import ComponentContainerMobile from 'components/component-container/mobile'
import SortingBarMobile from 'components/sorting-bar/mobile'
import FooterMobile from 'components/footer/mobile'

function MarketplaceMobile({
  accountsState,
  attributeValue,
  attributes,
  handleChangeAttribute,
  lowOrHigh,
  handleChangeSelectLowHigh,
}): ReactElement {
  return (
    <>
      <AppToolbar deviceType="mobile" section="marketplace" accountsState={accountsState} />
      <ComponentContainerMobile>
        <SortingBarMobile
          checkboxes={false}
          attributeValue={attributeValue}
          attributes={attributes}
          handleChangeAttribute={handleChangeAttribute}
          lowOrHigh={lowOrHigh}
          handleChangeSelectLowHigh={handleChangeSelectLowHigh}
        />
      </ComponentContainerMobile>
      <FooterMobile />
    </>
  )
}

export default withAccountsHOC(MarketplaceMobile)
