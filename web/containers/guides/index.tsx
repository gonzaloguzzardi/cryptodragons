import React from 'react'
import { ReactElement } from 'react'

import GuidesCommons from './guides'
import GuidesDesktop from './guides.desktop'
import GuidesMobile from './guides.mobile'

import { ISSRPropsDeviceOnly } from '../../types/server-side-props-device-only'

export default function Guides({ deviceType }: ISSRPropsDeviceOnly): ReactElement {
  return deviceType === 'desktop' ? (
    <GuidesCommons>
      <GuidesDesktop />
    </GuidesCommons>
  ) : (
    <GuidesCommons>
      <GuidesMobile />
    </GuidesCommons>
  )
}
