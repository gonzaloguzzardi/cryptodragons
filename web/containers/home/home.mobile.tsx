import React from 'react'
import { ReactElement } from 'react'

import AppToolbar from '../../components/app-toolbar'
import LandingSection from '../../components/home/landing-section/mobile'
import BuyADragonSection from '../../components/home/buy-a-dragon/mobile'
import MarketplaceSection from '../../components/home/marketplace/mobile'
import GuidesSection from '../../components/home/guides/mobile'
import FooterMobile from '../../components/footer/mobile'

import Home from './home'

export default function HomeMobile(): ReactElement {
  return (
    <Home>
      <AppToolbar deviceType="mobile" section="home" />
      <LandingSection />
      <BuyADragonSection />
      <MarketplaceSection />
      <GuidesSection />
      <FooterMobile />
    </Home>
  )
}
