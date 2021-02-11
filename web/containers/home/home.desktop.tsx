import React from 'react'
import { ReactElement } from 'react'

import AppToolbar from '../../components/app-toolbar'
import LandingSection from '../../components/home/landing-section/desktop'
import BuyADragonSection from '../../components/home/buy-a-dragon/desktop'
import MarketplaceSection from '../../components/home/marketplace/desktop'
import GuidesSection from '../../components/home/guides/desktop'
import FooterDesktop from '../../components/footer/desktop'

import Home from './home'

export default function HomeDesktop(): ReactElement {
  return (
    <Home>
      <AppToolbar deviceType="desktop" section="home" />
      <LandingSection />
      <BuyADragonSection />
      <MarketplaceSection />
      <GuidesSection />
      <FooterDesktop />
    </Home>
  )
}
