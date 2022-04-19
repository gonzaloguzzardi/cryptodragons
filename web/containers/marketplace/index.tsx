import React, { ReactElement } from 'react'

import MarketplaceCommons from './marketplace'
import MarketplaceDesktop from './marketplace.desktop'
import MarketplaceMobile from './marketplace.mobile'

import { ISSRPropsDeviceOnly } from 'types/server-side-props-device-only'

export default function Marketplace({ deviceType }: ISSRPropsDeviceOnly): ReactElement {
  const commonProps = {}

  return deviceType === 'desktop' ?
    <MarketplaceCommons children={<MarketplaceDesktop {...commonProps} />} /> :
    <MarketplaceCommons children={<MarketplaceMobile {...commonProps} />} />
}
