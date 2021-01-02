import React from 'react'
import { ReactElement } from 'react'

import GuidesDesktop from './guides.desktop'
import GuidesMobile from './guides.mobile'

import { ISSRPropsDeviceOnly } from '../../types/server-side-props-device-only'

export default function Guides({ deviceType }: ISSRPropsDeviceOnly): ReactElement {
  if (deviceType === 'desktop') return <GuidesDesktop />

  // mobile || tablet
  return <GuidesMobile />
}
