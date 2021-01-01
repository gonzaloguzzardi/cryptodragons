import React from 'react'
import { ReactElement } from 'react'

import HomeDesktop from './home.desktop'
import HomeMobile from './home.mobile'

import { ISSRPropsDeviceOnly } from '../../types/server-side-props-device-only'

export default function Home({ deviceType }: ISSRPropsDeviceOnly): ReactElement {
  if (deviceType === 'desktop') return <HomeDesktop />

  // mobile || tablet
  return <HomeMobile />
}
