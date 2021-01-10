import React from 'react'
import { ReactElement } from 'react'

import AppToolbar from '../../components/app-toolbar'
import Landing from '../../components/home/landing-section'
import BuyADragonSection from '../../components/home/buy-a-dragon'

import Home from './home'

export default function HomeMobile(): ReactElement {
  return (
    <Home>
      <AppToolbar deviceType="mobile" section="home" />
      <Landing />
      <BuyADragonSection />
    </Home>
  )
}
