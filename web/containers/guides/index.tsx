import React, { ReactElement } from 'react'
// import { useRouter } from 'next/router'

import AboutMarkdown from './templates/hola.mdx'

import GuidesCommons from './guides'
import GuidesDesktop from './guides.desktop'
import GuidesMobile from './guides.mobile'

import { ISSRPropsDeviceOnly } from 'types/server-side-props-device-only'

export default function Guides({ deviceType }: ISSRPropsDeviceOnly): ReactElement {
  // const router = useRouter()
  // const { pid } = router.query

  return deviceType === 'desktop' ? (
    <GuidesCommons>
      <GuidesDesktop content={<AboutMarkdown />} />
    </GuidesCommons>
  ) : (
    <GuidesCommons>
      <GuidesMobile content={<AboutMarkdown />} />
    </GuidesCommons>
  )
}
