import React from 'react'
import { ReactElement } from 'react'

import MyDragonsDesktop from './my-dragons.desktop'
import MyDragonsMobile from './my-dragons.mobile'

import { ISSRPropsDeviceOnly } from '../../types/server-side-props-device-only'

export default function MyDragons({ deviceType }: ISSRPropsDeviceOnly): ReactElement {
  if (deviceType === 'desktop') return <MyDragonsDesktop />

  // mobile || tablet
  return <MyDragonsMobile />
}
