import React, { ReactElement } from 'react'

import GuideCommons from './guide'
import GuideDesktop from './guide.desktop'
import GuideMobile from './guide.mobile'

import { tGuideProps } from './types'

export default function Guide({ deviceType, guideData }: tGuideProps): ReactElement {
  return deviceType === 'desktop' ? (
    <GuideCommons>
      <GuideDesktop guideData={guideData} />
    </GuideCommons>
  ) : (
    <GuideCommons>
      <GuideMobile guideData={guideData} />
    </GuideCommons>
  )
}
