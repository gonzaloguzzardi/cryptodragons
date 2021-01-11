import React from 'react'
import { ReactElement } from 'react'

import AppToolbar from '../../components/app-toolbar'
import LandingSection from '../../components/home/landing-section/mobile'
import BuyADragonSection from '../../components/home/buy-a-dragon/mobile'

import Home from './home'

export default function HomeMobile(): ReactElement {
  return (
    <Home>
      <AppToolbar deviceType="mobile" section="home" />
      <LandingSection />
      <BuyADragonSection />
    </Home>
  )
}
