import React from 'react'
import { ReactElement } from 'react'

import AppToolbar from '../../components/app-toolbar'
import LandingSection from '../../components/home/landing-section/desktop'
import BuyADragonSection from '../../components/home/buy-a-dragon/desktop'

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
