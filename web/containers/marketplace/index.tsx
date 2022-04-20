import React, { ReactElement } from 'react'

import MarketplaceCommons from './marketplace'
import MarketplaceDesktop from './marketplace.desktop'
import MarketplaceMobile from './marketplace.mobile'

import { LOW_TO_HIGH_VALUE /*, HIGH_TO_LOW_VALUE*/ } from 'components/sorting-bar/constants'

import { ISSRPropsDeviceOnly } from 'types/server-side-props-device-only'

export default function Marketplace({ deviceType }: ISSRPropsDeviceOnly): ReactElement {
  const commonProps = {
    attributeValue: 0,
    attributes: [{ name: 'Price', value: 0 }],
    handleChangeAttribute: () => null,
    lowOrHigh: LOW_TO_HIGH_VALUE,
    handleChangeSelectLowHigh: () => null,
  }

  return deviceType === 'desktop' ? (
    <MarketplaceCommons>
      <MarketplaceDesktop {...commonProps} />
    </MarketplaceCommons>
  ) : (
    <MarketplaceCommons>
      <MarketplaceMobile {...commonProps} />
    </MarketplaceCommons>
  )
}
