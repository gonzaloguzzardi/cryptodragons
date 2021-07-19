import React, { ReactElement } from 'react'

import { withAccountsHOC } from '../../hooks/accounts-context'

import AppToolbar from '../../components/app-toolbar'
import LandingSection from '../../components/home/landing-section/mobile'
import BuyADragonSection from '../../components/home/buy-a-dragon/mobile'
import MarketplaceSection from '../../components/home/marketplace/mobile'
import GuidesSection from '../../components/home/guides/mobile'
import FooterMobile from '../../components/footer/mobile'

function HomeMobile({ accountsState }): ReactElement {
  console.log('Account state', JSON.stringify(accountsState, null, 2))

  return (
    <>
      <AppToolbar deviceType="mobile" section="home" accountsState={accountsState} />
      <LandingSection />
      <BuyADragonSection />
      <MarketplaceSection />
      <GuidesSection />
      <FooterMobile />
    </>
  )
}

export default withAccountsHOC(HomeMobile)
