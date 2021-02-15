import React, { ReactElement } from 'react'

import { withAccountsHOC } from '../../hooks/accounts-context'

import AppToolbar from '../../components/app-toolbar'
import LandingSection from '../../components/home/landing-section/desktop'
import BuyADragonSection from '../../components/home/buy-a-dragon/desktop'
import MarketplaceSection from '../../components/home/marketplace/desktop'
import GuidesSection from '../../components/home/guides/desktop'
import FooterDesktop from '../../components/footer/desktop'

function HomeDesktop({ accountsState }): ReactElement {
  console.log('Account state', JSON.stringify(accountsState, null, 2))

  return (
    <>
      <AppToolbar deviceType="desktop" section="home" />
      <LandingSection />
      <BuyADragonSection />
      <MarketplaceSection />
      <GuidesSection />
      <FooterDesktop />
    </>
  )
}

export default withAccountsHOC(HomeDesktop)
