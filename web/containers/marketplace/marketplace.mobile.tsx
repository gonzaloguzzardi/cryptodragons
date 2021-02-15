import React from 'react'
import { ReactElement } from 'react'

import AppToolbar from '../../components/app-toolbar'

import Marketplace from './marketplace'

export default function MarketplaceMobile(): ReactElement {
  return (
    <Marketplace>
      <AppToolbar deviceType="mobile" section="marketplace" />
      <p>Marketplace</p>
    </Marketplace>
  )
}
