import React, { ReactElement } from 'react'

import GuidesCommons from './guides'
import GuidesDesktop from './guides.desktop'
import GuidesMobile from './guides.mobile'

import { tGuidesProps } from './types'

export default function Guides({ deviceType, guidesData }: tGuidesProps): ReactElement {
  return deviceType === 'desktop' ? (
    <GuidesCommons>
      <GuidesDesktop guidesData={guidesData} />
    </GuidesCommons>
  ) : (
    <GuidesCommons>
      <GuidesMobile guidesData={guidesData} />
    </GuidesCommons>
  )
}
