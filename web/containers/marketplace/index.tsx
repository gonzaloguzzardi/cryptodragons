import React from 'react'
import { ReactElement } from 'react'

import MarketplaceDesktop from './marketplace.desktop'
import MarketplaceMobile from './marketplace.mobile'

import { ISSRPropsDeviceOnly } from '../../types/server-side-props-device-only'

export default function Marketplace({ deviceType }: ISSRPropsDeviceOnly): ReactElement {
  if (deviceType === 'desktop') return <MarketplaceDesktop />

  // mobile || tablet
  return <MarketplaceMobile />
}
