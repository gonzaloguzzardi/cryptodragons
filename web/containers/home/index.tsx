import React from 'react'
import { ReactElement } from 'react'

import HomeCommons from './home'
import HomeDesktop from './home.desktop'
import HomeMobile from './home.mobile'

import { ISSRPropsDeviceOnly } from '../../types/server-side-props-device-only'

export default function Home({ deviceType }: ISSRPropsDeviceOnly): ReactElement {
  return deviceType === 'desktop' ? (
    <HomeCommons>
      <HomeDesktop />
    </HomeCommons>
  ) : (
    <HomeCommons>
      <HomeMobile />
    </HomeCommons>
  )
}
