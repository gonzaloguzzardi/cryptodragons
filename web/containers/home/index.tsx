import React from 'react'
import { ReactElement } from 'react'

import HomeMobile from './home.mobile'
import HomeDesktop from './home.desktop'

import { ISSRPropsDeviceOnly } from '../../types/server-side-props-device-only'

export default function Home({ deviceType }: ISSRPropsDeviceOnly): ReactElement {
  if (deviceType === 'mobile' || deviceType === 'tablet') return <HomeMobile />

  if (deviceType === 'desktop') return <HomeDesktop />
}
