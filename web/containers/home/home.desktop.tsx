import React from 'react'
import { ReactElement } from 'react'

import AppToolbar from '../../components/app-toolbar'
import LandingSection from '../../components/home/landing-section'
import BuyADragonSection from '../../components/home/buy-a-dragon'

import Home from './home'

export default function HomeDesktop(): ReactElement {
  return (
    <Home>
      <AppToolbar deviceType="desktop" section="home" />
      <LandingSection />
      <BuyADragonSection />
    </Home>
  )
}
