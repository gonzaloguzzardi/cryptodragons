import React from 'react'
import { ReactElement } from 'react'

import MarketplaceCommons from './marketplace'
import MarketplaceDesktop from './marketplace.desktop'
import MarketplaceMobile from './marketplace.mobile'

import { ISSRPropsDeviceOnly } from '../../types/server-side-props-device-only'

export default function Marketplace({ deviceType }: ISSRPropsDeviceOnly): ReactElement {
  return deviceType === 'desktop' ? (
    <MarketplaceCommons>
      <MarketplaceDesktop />
    </MarketplaceCommons>
  ) : (
    <MarketplaceCommons>
      <MarketplaceMobile />
    </MarketplaceCommons>
  )
}
